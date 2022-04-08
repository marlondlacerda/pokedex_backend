# Docker launcher script
This [launcher script](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#running-tests-remotely) runs mocha tests in a docker container which is started by the script and removed when `mocha` finishes running in the container.

## Sample project
https://github.com/hbenl/vscode-mocha-docker-example contains a sample project using this launcher script to run and debug tests in a `node:current-alpine` container.

## Prerequisites
You need to have `docker` installed and a docker image containing `node`.

## Configuration
Install this package in your workspace and set `mochaExplorer.launcherScript` to `"node_modules/mocha-explorer-launcher-scripts/docker"`.
The script is configured using environment variables which are set using `mochaExplorer.env`.

Required:
|            |                             |
|------------|-----------------------------|
|DOCKER_IMAGE| The name of the docker image|

Optional:
|                     |                                                                                                                          |
|---------------------|--------------------------------------------------------------------------------------------------------------------------|
|DOCKER_EXTRA_ARGS    | JSON-encoded extra arguments passed to the `docker` command                                                              |
|DOCKER_WORKER_PATH   | The absolute path inside the container where the mocha worker script should be mounted (default: `/worker.js`)           |
|DOCKER_WORKSPACE_PATH| The absolute path inside the container where the workspace should be mounted (default: `/workspace`)                     |
|DOCKER_WORKER_PORT   | The TCP port used by the launcher script to communicate with the worker script running in the container (default: `8123`)|
|VSCODE_WORKSPACE_PATH| The absolute path to the VS Code workspace containing the tests (default: the current working directory)                 |

## Debugging
To debug your tests in the container you'll need to create a node debugging configuration containing the `localRoot` and `remoteRoot` settings containing the workspace ([example](https://github.com/hbenl/vscode-mocha-docker-example/blob/master/.vscode/launch.json)) and set `mochaExplorer.debuggerConfig` to the name of that configuration.

## Troubleshooting
Enable the [diagnostic log](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#troubleshooting) to see log messages from the launcher script.
