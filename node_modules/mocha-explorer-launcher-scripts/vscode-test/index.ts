import * as util from 'util';
import { runTests } from '@vscode/test-electron';

(async function() {
	try {

		// The IPC options specify how the worker should connect to Mocha Explorer
		const ipcOpts = JSON.parse(process.argv[2]);

		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = process.env['VSCODE_WORKSPACE_PATH']!;

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = require.resolve('./runMochaWorker');

		// The VS Code version to download
		const version = process.env['VSCODE_VERSION']!;

		// Optional launch arguments to VS Code
		let launchArgs: string[] | undefined;
		if (process.env['VSCODE_LAUNCH_ARGS']) {
			launchArgs = JSON.parse(process.env['VSCODE_LAUNCH_ARGS']);
		}

		// Download VS Code, unzip it and run the integration test
		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			version,
			launchArgs,
			extensionTestsEnv: {
				MOCHA_WORKER_IPC_ROLE: ipcOpts.role,
				MOCHA_WORKER_IPC_PORT: String(ipcOpts.port),
				MOCHA_WORKER_IPC_HOST: ipcOpts.host
			}
		});

	} catch (err) {
		console.error(`Failed to run tests: ${util.inspect(err)}`);
		process.exit(1);
	}
})();
