# Mocha Test Explorer remoting utility functions

This package contains utility functions for running tests remotely with
[Mocha Test Explorer](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter).

## Running tests remotely

You can let the Mocha Test Explorer run your tests in a remote environment (e.g. in a docker
container or via ssh on a remote machine) by writing a launcher script.
Usually, when Mocha Test Explorer loads or runs your tests, it does so by running a worker script
in a child process and communicating with it using the mocha worker protocol (which is a simple
internal protocol of Mocha Test Explorer).
If you write a launcher script and set `mochaExplorer.launcherScript` in your VS Code settings to
the location of that script, Mocha Test Explorer will run your launcher script instead of its
worker script. Your launcher script should then run the worker script in the remote environment
and forward the worker protocol messages between Mocha Test Explorer and the remotely running
worker script.

There are example projects containing well-documented launcher scripts for running your tests
[in a docker container](https://github.com/hbenl/vscode-mocha-docker-example) or
[on another machine via ssh](https://github.com/hbenl/vscode-mocha-ssh-example).

### Details of the mocha worker protocol

The mocha worker protocol is a very simple message-based protocol that is closely related to the
[Test Adapter API](https://github.com/hbenl/vscode-test-adapter-api). It is usually sent via a
node IPC channel (using [`process.send(...)`](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_subprocess_send_message_sendhandle_options_callback) and
[`process.on('message', ...)`](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_event_message))
or a TCP/IP connection.

The first message of the protocol is a
[`WorkerArgs`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/mocha.ts#L11)
object sent by Mocha Test Explorer.
It contains all the necessary information about what the worker script should do.

All subsequent messages are sent by the worker script. They contain the worker's results:
* if the worker loads the tests, it will send a
  [`TestSuiteInfo`](https://github.com/hbenl/vscode-test-adapter-api/blob/master/src/index.ts#L172)
  object containing all suites and tests, `null` if no tests could be found or an 
  [`ErrorInfo`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/mocha.ts#L61)
  object if the worker encountered an error that should be shown in the UI.
* if the worker runs the tests, it will send 
  [`TestSuiteEvent`](https://github.com/hbenl/vscode-test-adapter-api/blob/master/src/index.ts#L235) and
  [`TestEvent`](https://github.com/hbenl/vscode-test-adapter-api/blob/master/src/index.ts#L264)
  objects for the suites and tests that were started or finished and a
  [`TestRunFinishedEvent`](https://github.com/hbenl/vscode-test-adapter-api/blob/master/src/index.ts#L165)
  when the test run has finished.
* in both cases the worker can also send `string`s in between these messages - these will be added
  to Mocha Test Explorer's diagnostic log (if it is enabled).

### The launcher script

In order to load or run the tests in a remote environment, the launcher script needs to:
* deploy your code in the remote environment. For example, if the remote environment is a docker
  container, it could
  [bind-mount](https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only)
  your workspace folder into the container. If the remote environment is a server reachable via ssh,
  it could use `rsync` to copy the workspace folder.
* deploy mocha in the remote environment. If your workspace folder contains mocha in
  `node_modules/mocha` and you have deployed the entire workspace folder in the remote environment,
  you can use that copy of mocha by setting `"mochaExplorer.mochaPath": "node_modules/mocha"`
  in your VS Code settings. Alternatively, you could deploy mocha to some other location in the
  remote environment and set the `mochaPath` property in the `WorkerArgs` to that location.
  Or you could let node resolve the mocha location in the remote environment (using node's standard
  resolution algorithm) by setting `mochaPath` in the `WorkerArgs` to `undefined`.
* send the worker script to the remote environment. This could also be done using bind-mount or
  `rsync` or it could be sent via `stdin` to the node process in the remote environment.
* start the worker script remotely. This is usually done by 
  [`spawn()`](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options)-ing
  `docker`, `ssh` or any other program that you use to access the remote environment.
* establish a communication channel with the worker. This will usually be a TCP/IP connection,
  this package contains functions that help establishing this connection.
* forward the worker protocol messages. Since these messages usually contain file paths that
  are different between local and remote environment, it must also convert these paths.
  This package also contains helper functions for this conversion.
* forward `stdout` and `stderr` from the worker process to the launcher process (the easiest
  way to do this is to set `stdio: 'inherit'` in the options to `spawn()`)
* listen to `error` and `exit` events from the `spawn()`ed process and send corresponding
  log messages to Mocha Test Explorer's diagnostic log.

(The last 2 points are optional but highly recommended to help with troubleshooting)

### Communicating with the worker

The worker script usually communicates with Mocha Test Explorer using a node IPC channel, but
this channel is not available when running the worker remotely, so we need to use a TCP/IP
connection instead. To tell the worker to use TCP/IP, the launcher script must pass a
JSON-encoded
[`NetworkOptions`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/mocha.ts#L70)
object as the first (command-line) argument to the worker process. The `NetworkOptions` tell the
worker if it should act as a TCP server or client (the `role` property), which `port` it should
use and (optionally) the `host` it should connect to (when acting as a TCP client) or which `host`
address it should listen on (when acting as a TCP server).

The launcher script can use the
[`createConnection()`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/ipc.ts#L24)
(if the worker acts as a TCP server) or
[`receiveConnection`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/ipc.ts#L111)
(if the worker acts as a TCP client) functions from this package to establish the connection
to the worker. 

The worker protocol messages are JSON-encoded and separated by a newline character. This
package also contains the
[`writeMessage()`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/ipc.ts#L181) and
[`readMessages()`](https://github.com/hbenl/vscode-test-adapter-remoting-util/blob/master/src/ipc.ts#L189)
functions that take care of this encoding.
