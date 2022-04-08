import { spawn } from 'child_process';
import { inspect } from 'util';
import { mochaWorker, convertPath, createConnection, writeMessage, readMessages } from 'vscode-test-adapter-remoting-util';

(function() {

// Any string that is sent to Mocha Test Explorer is added to the diagnostic log (if it is enabled)
const log = (msg: string) => process.send!(msg);

// The docker image in which to run the tests
const dockerImage = process.env['DOCKER_IMAGE'];
if (!dockerImage) {
	log('No docker image configured - please set the DOCKER_IMAGE environment variable');
	return;
}

// The path to the workspace containing the tests
const localWorkspace = process.env['VSCODE_WORKSPACE_PATH'] || process.cwd();

// The paths to use in the docker container
const dockerWorker = process.env['DOCKER_WORKER_PATH'] || '/worker.js';
const dockerWorkspace = process.env['DOCKER_WORKSPACE_PATH'] || '/workspace';

// Optional extra docker arguments
let dockerExtraArgs: string[];
try {
	dockerExtraArgs = JSON.parse(process.env['DOCKER_EXTRA_ARGS'] || '[]');
} catch {
	log(`Couldn't parse DOCKER_EXTRA_ARGS: "${process.env['DOCKER_EXTRA_ARGS']}" is not a valid JSON string.`);
	return;
}

// The TCP port for the communication channel between the launcher and worker scripts
let port: number;
try {
	port = +(process.env['DOCKER_WORKER_PORT'] || 8123);
} catch {
	log(`Couldn't parse DOCKER_WORKER_PORT: "${process.env['DOCKER_WORKER_PORT']}" is not a number.`);
	return;
}

// These functions convert the paths between the local and docker environments
const localToDockerPath = (path: string) => convertPath(path, localWorkspace, dockerWorkspace);
const dockerToLocalPath = (path: string) => convertPath(path, dockerWorkspace, localWorkspace);

// Receive the first message of the worker protocol from the Mocha Test Explorer
process.once('message', async origWorkerArgs => {

	log('Received workerArgs');

	// Convert the paths in the `WorkerArgs` for the docker environment
	const workerArgs = mochaWorker.convertWorkerArgs(origWorkerArgs, localToDockerPath);

	// If the tests should be run in the debugger, we need to pass extra arguments
	// to node to enable the debugger and to docker to expose the debugger port
	let nodeDebugArgs: string[] = [];
	let dockerDebugArgs: string[] = [];
	let delay: number | undefined = undefined;
	if (workerArgs.debuggerPort) {
		nodeDebugArgs = [ `--inspect-brk=0.0.0.0:${workerArgs.debuggerPort}` ]
		dockerDebugArgs = [ '-p', `${workerArgs.debuggerPort}:${workerArgs.debuggerPort}` ];
		delay = 2000;
	}

	// Start a child process that will run the worker script in a docker container
	log('Starting worker process');
	const childProcess = spawn(
		'docker',
		[
			// Create and start the container and remove it when it is finished
			'run', '--rm',

			// bind-mount this workspace folder into the container
			'-v', `${localWorkspace}:${dockerWorkspace}`,

			// bind-mount the worker script into the container
			'-v', `${origWorkerArgs.workerScript}:${dockerWorker}`,

			// Expose the port for the worker protocol
			'-p', `${port}:${port}`,

			// Optionally expose the node debugger port
			...dockerDebugArgs,

			// Optional extra arguments for docker
			...dockerExtraArgs,

			// The docker image to use
			dockerImage,

			// We want to run node in the container
			'node',

			// Optionally enable the node debugger
			...nodeDebugArgs,

			// We want node to run the bind-mounted worker script
			dockerWorker,

			// This tells the worker script to accept a connection for the worker protocol on the given port
			`{"role":"server","port":${port}}`
		],

		// We use 'inherit' to forward the messages on `stdout` and `stderr` from the child process
		// to this process, so they can be received by Mocha Test Explorer
		{ stdio: 'inherit' }
	);

	// Report error events from the child process to the diagnostic log of Mocha Test Explorer
	childProcess.on('error', err => log(`Error from docker: ${inspect(err)}`));

	// Write a log message when the child process exits
	childProcess.on('exit', (code, signal) => {
		log(`The docker process exited with code ${code} and signal ${signal}.`);

		// If the child process should have loaded the tests but exited abnormally,
		// we send an `ErrorInfo` object so that the error is shown in the Test Explorer UI
		if ((workerArgs.action === 'loadTests') && (code || signal)) {
			process.send!({
				type: 'finished',
				errorMessage: `The docker process exited with code ${code} and signal ${signal}.\nThe diagnostic log may contain more information, enable it with the "mochaExplorer.logpanel" or "mochaExplorer.logfile" settings.`
			});
		}
	});

	if (delay) {
		// This delay is necessary when the node debugger is enabled...
		await new Promise(resolve => setTimeout(resolve, delay!));
	}

	// Establish the TCP/IP connection to the worker
	log('Connecting to worker process');
	const socket = await createConnection(port);

	// Forward the `WorkerArgs` that we received earlier from Mocha Test Explorer to the worker
	log('Sending workerArgs to worker process');
	await writeMessage(socket, workerArgs);

	log('Finished initialising worker');

	// Receive the results from the worker, translate any paths in them and forward them to Mocha Test Explorer
	readMessages(socket, (msg: any) => {
		if (workerArgs.action === 'loadTests') {
			process.send!(mochaWorker.convertTestLoadMessage(msg, dockerToLocalPath));
		} else {
			process.send!(mochaWorker.convertTestRunMessage(msg, dockerToLocalPath));
		}
	});
});
})();
