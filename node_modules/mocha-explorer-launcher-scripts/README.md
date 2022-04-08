# Launcher scripts for Mocha Test Explorer

This package contains [launcher scripts](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter#running-tests-remotely) for the [Mocha Test Explorer extension](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-mocha-test-adapter) for [Visual Studio Code](https://code.visualstudio.com/).
To use a launcher script, install this package in your workspace and use the `mochaExplorer.launcherScript` setting to tell Mocha Test Explorer about it. Some scripts require more configuration in the form of environment variables set using the `mochaExplorer.env` setting.
The scripts are well documented so that you can use them as templates for your own launcher script if you need one. More documentation for writing launcher scripts can be found in the [vscode-test-adapter-remoting-util](https://github.com/hbenl/vscode-test-adapter-remoting-util) package, which contains utility functions for use in these scripts.
