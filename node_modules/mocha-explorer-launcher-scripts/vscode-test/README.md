# vscode-test launcher script
This [launcher script](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#running-tests-remotely) runs `vscode-test` tests.

## Sample project
https://github.com/hbenl/vscode-extension-samples/tree/test-explorer-integration/helloworld-test-sample contains a sample project using this launcher script.

## Configuration
Install this package in your workspace and add the following to your VS Code settings:
```
"mochaExplorer.launcherScript": "node_modules/mocha-explorer-launcher-scripts/vscode-test",
"mochaExplorer.autoload": false,
"mochaExplorer.ipcRole": "server",
"mochaExplorer.env": {
  "VSCODE_VERSION": "insiders",
  "ELECTRON_RUN_AS_NODE": null
}
```
The script is configured using environment variables which are set using `mochaExplorer.env`.

Required:
|              |                                           |
|--------------|-------------------------------------------|
|VSCODE_VERSION| The version of VS Code to run the tests in|

Optional:
|                     |                                                                                                 |
|---------------------|-------------------------------------------------------------------------------------------------|
|VSCODE_WORKSPACE_PATH| The absolute path to the VS Code workspace containing the tests (default: the current workspace)|
|VSCODE_LAUNCH_ARGS   | Extra launch arguments for VS Code                                                              |

## Debugging
Debugging `vscode-test` tests using Mocha Test Explorer is currently not supported.

## Troubleshooting
Enable the [diagnostic log](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#troubleshooting) to see log messages from the launcher script.
