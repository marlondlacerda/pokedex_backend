import * as path from 'path';
import { fork, spawn } from 'child_process';
import { receiveConnection, createConnection, writeMessage, readMessages } from 'vscode-test-adapter-remoting-util';
import { WorkerArgs } from 'vscode-test-adapter-remoting-util/out/mocha';

process.once('message', async (workerArgs: WorkerArgs) => {

	process.chdir(workerArgs.cwd);

	// we only use nyc for running the tests, but not for loading or debugging them
	if ((workerArgs.action === 'runTests') && !workerArgs.debuggerPort) {

		// IPC options for the communication between this launcher script and the worker script
		const ipcOpts = {
			role: 'client',
			port: parseInt(process.env['NYC_PORT'] || '8123'),
			host: 'localhost'
		};

		const nycPath = path.resolve(workerArgs.cwd, process.env['NYC_PATH'] || "node_modules/.bin/nyc");
		const nycReporter = process.env['NYC_REPORTER'] || 'lcov';

		spawn(
			nycPath,
			[
				`--reporter=${nycReporter}`,
				process.execPath,
				workerArgs.workerScript!,
				JSON.stringify(ipcOpts)
			],
			// setting stdio to 'inherit' ensures that any messages that the tests
			// write to stdout/stderr will reach Mocha Test Explorer
			{ stdio: 'inherit' }
		);

		const socket = await receiveConnection(ipcOpts.port);

		// forward the request to the worker script
		writeMessage(socket, workerArgs);
		// forward the results from the worker script
		readMessages(socket, msg => process.send!(msg));

	} else {

		const execArgv = workerArgs.debuggerPort ? [ `--inspect-brk=${workerArgs.debuggerPort}` ] : [];

		const childProc = fork(workerArgs.workerScript!, [], { execArgv, stdio: 'inherit' });

		// forward the request to the worker script
		childProc.send(workerArgs);
		// forward the results from the worker script
		childProc.on('message', msg => process.send!(msg));
	}
});
