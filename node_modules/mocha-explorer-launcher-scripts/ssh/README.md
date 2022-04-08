# SSH launcher script
This [launcher script](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#running-tests-remotely) runs mocha tests remotely via ssh.

## Sample project
https://github.com/hbenl/vscode-mocha-ssh-example contains a sample project using this launcher script.

## Prerequisites
You need to have `ssh` and `rsync` installed on the local and remote machines and be able to login on the remote machine without entering a password. Furthermore, `node` needs to be installed on the remote machine.

## Configuration
Install this package in your workspace and set `mochaExplorer.launcherScript` to `"node_modules/mocha-explorer-launcher-scripts/ssh"`.
The script is configured using environment variables which are set using `mochaExplorer.env`.

Required:
|                  |                                                                                |
|------------------|--------------------------------------------------------------------------------|
|SSH_HOST          | The name of the remote host                                                    |
|SSH_WORKSPACE_PATH| The absolute path on the remote host where the workspace should be `rsync`ed to|

Optional:
|                     |                                                                                                                  |
|---------------------|------------------------------------------------------------------------------------------------------------------|
|SSH_USER             | The username on the remote host                                                                                  |
|SSH_WORKER_PORT      | The TCP port used by the launcher script to communicate with the worker script running remotely (default: `8123`)|
|VSCODE_WORKSPACE_PATH| The absolute path to the VS Code workspace containing the tests (default: the current working directory)         |

## Debugging
To debug your tests in the container you'll need to create a node debugging configuration containing the `localRoot` and `remoteRoot` settings ([example](https://github.com/hbenl/vscode-mocha-ssh-example/blob/master/.vscode/launch.json)) and set `mochaExplorer.debuggerConfig` to the name of that configuration.

## Troubleshooting
Enable the [diagnostic log](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#troubleshooting) to see log messages from the launcher script.
