import { spawn, execSync } from 'child_process';
import { readFileSync } from 'fs';
import { inspect } from 'util';
import { mochaWorker, convertPath, receiveConnection, writeMessage, readMessages } from 'vscode-test-adapter-remoting-util';

(function() {

// Any string that is sent to Mocha Test Explorer is added to the diagnostic log (if it is enabled)
const log = (msg: string) => process.send!(msg);

// How to access the remote environment:
// make sure you can login using `ssh ${remoteUser}@${remoteHost}` without having to enter a password
const remoteHost = process.env['SSH_HOST'];
if (!remoteHost) {
	log('No remote host configured - please set the SSH_HOST environment variable');
	return;
}
const remoteUser = process.env['SSH_USER'];
const destination = remoteUser ? `${remoteUser}@${remoteHost}` : remoteHost;

// The paths of the local and remote workspaces
const localWorkspace = process.env['VSCODE_WORKSPACE_PATH'] || process.cwd();;
const remoteWorkspace = process.env['SSH_WORKSPACE_PATH'];
if (!remoteWorkspace) {
	log('No remote workspace path configured - please set the SSH_WORKSPACE_PATH environment variable');
	return;
}

// This port will be used for the communication channel between the launcher and worker scripts
let port: number;
try {
	port = +(process.env['SSH_WORKER_PORT'] || 8123);
} catch {
	log(`Couldn't parse SSH_WORKER_PORT: "${process.env['SSH_WORKER_PORT']}" is not a number.`);
	return;
}

// These functions convert the paths between the local and remote environments
const localToRemotePath = (path: string) => convertPath(path, localWorkspace, remoteWorkspace);
const remoteToLocalPath = (path: string) => convertPath(path, remoteWorkspace, localWorkspace);

// Receive the first message of the worker protocol from the Mocha Test Explorer
process.once('message', async origWorkerArgs => {

	log('Received workerArgs');

	// Convert the paths in the `WorkerArgs` for the remote environment
	const workerArgs = mochaWorker.convertWorkerArgs(origWorkerArgs, localToRemotePath);

	// If the tests should be run in the debugger, we need to pass extra arguments to node
	// to enable the debugger and to ssh to tunnel the debugger connection
	let nodeDebugArgs: string[] = [];
	let sshDebugArgs: string[] = [];
	if (workerArgs.debuggerPort) {
		nodeDebugArgs = [ `--inspect-brk=${workerArgs.debuggerPort}` ]
		sshDebugArgs = [ '-L', `${workerArgs.debuggerPort}:localhost:${workerArgs.debuggerPort}` ];
	}

	// Copy the workspace folder to the remote environment using rsync
	log('Syncing workspace');
	const rsyncOutput = execSync(`rsync -r ${localWorkspace}/ ${destination}:${remoteWorkspace}`);
	log(`Output from rsync: ${rsyncOutput.toString()}`);

	// Start a child process that will run the worker script via ssh
	log('Starting worker via ssh');
	const childProcess = spawn(
		'ssh',
		[
			destination,

			// Tunnel the TCP connection for the worker protocol
			'-R', `${port}:localhost:${port}`,

			// Optionally tunnel the TCP connection for the debugger protocol
			...sshDebugArgs,

			// We want to run node on the remote host
			'node',

			// Optionally enable the node debugger
			...nodeDebugArgs,

			// This tells node that it should receive the worker script on `stdin`
			'-',

			// This tells the worker script to connect to localhost:${port} for the worker protocol
			JSON.stringify(`{"role":"client","port":${port}}`)
		],

		// We use 'inherit' to forward the messages on `stdout` and `stderr` from the child process
		// to this process, so they can be received by Mocha Test Explorer. `stdin` is set to 'pipe'
		// so we can use it to send the worker script
		{ stdio: [ 'pipe', 'inherit', 'inherit' ] }
	);

	// Report error events from the child process to the diagnostic log of Mocha Test Explorer
	childProcess.on('error', err => log(`Error from ssh: ${inspect(err)}`));

	// Write a log message when the child process exits
	childProcess.on('exit', (code, signal) => {
		log(`The ssh process exited with code ${code} and signal ${signal}.`);

		// If the child process should have loaded the tests but exited abnormally,
		// we send an `ErrorInfo` object so that the error is shown in the Test Explorer UI
		if ((workerArgs.action === 'loadTests') && (code || signal)) {
			process.send!({
				type: 'finished',
				errorMessage: `The ssh process exited with code ${code} and signal ${signal}.\nThe diagnostic log may contain more information, enable it with the "mochaExplorer.logpanel" or "mochaExplorer.logfile" settings.`
			});
		}
	});

	// Send the worker script to the child process
	log('Sending worker script');
	childProcess.stdin.write(
		readFileSync(origWorkerArgs.workerScript),
		() => log('Finished sending worker script')
	);
	childProcess.stdin.end();

	// Establish the TCP/IP connection to the worker
	log('Waiting for worker process to connect');
	const socket = await receiveConnection(port);

	// Forward the `WorkerArgs` that we received earlier from Mocha Test Explorer to the worker
	log('Sending workerArgs to worker process');
	await writeMessage(socket, workerArgs);

	log('Finished initialising worker');

	// Receive the results from the worker, translate any paths in them and forward them to Mocha Test Explorer
	readMessages(socket, (msg: any) => {
		if (workerArgs.action === 'loadTests') {
			process.send!(mochaWorker.convertTestLoadMessage(msg, remoteToLocalPath));
		} else {
			process.send!(mochaWorker.convertTestRunMessage(msg, remoteToLocalPath));
		}
	});
});
})();
