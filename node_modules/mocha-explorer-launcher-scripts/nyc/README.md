# NYC launcher script
This [launcher script](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#running-tests-remotely) runs mocha tests using the `nyc` profiler.

## Configuration
Install this package in your workspace and set `mochaExplorer.launcherScript` to `"node_modules/mocha-explorer-launcher-scripts/nyc"`.
The script can optionally be configured using the following environment variables which are set using `mochaExplorer.env`.

Optional:
|            |                                                                                                 |
|------------|-------------------------------------------------------------------------------------------------|
|NYC_PORT    | The TCP port used by the launcher script to communicate with the worker script (default: `8123`)|
|NYC_PATH    | The path to the `nyc` executable (default: `"node_modules/.bin/nyc"`)                           |
|NYC_REPORTER| The `nyc` reporter (default: `"lcov"`)                                                          |

## Troubleshooting
Enable the [diagnostic log](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#troubleshooting) to see log messages from the launcher script.
