## Package management
- include external packages in your Node.js projects.
- These third-party modules are referred to as dependencies.
- Downloads and installs the packages to be used as dependencies on a project.
- Checks the packages to make sure they don’t have any known vulnerabilities.
- Checks if packages can be updated to a newer version.
- handles all of the packages’ sub-dependencies.
- Cleanly removes all the files of a package when it’s no longer needed.
- Provides a repeatable and consistent process of installing dependencies for you and your teammates.
- The most popular package manager is Node Package Manager, or NPM, which is the default package manager for Node.js.

### Initialization

```js
npm init
```

npm init -y to get initialized quickly

### Installation
A popular Node.js package is nodemon, a tool used to automatically restart a program when a file changes, alleviating the need to do so manually each time you save a file.

```js
npm i nodemon
```

#### devDependencies
development dependencies are used for the purpose of making development easier or more efficient.
In fact, the nodemon package is actually better suited as a development dependency
This indicates that the package is being used specifically for development and will not be included in a production release of the project.

```js
npm install nodemon --save-dev
// or npm i nodemon -D
```

#### Global packages
Some packages can be installed globally meaning they are available system-wide, without the need to install it each time you create a new application.
Typically, packages installed this way will be used in the command-line rather than imported into a project’s code. 
One such example is the http-server package which allows you to spin up a zero-configuration server from anywhere in the command-line.

```js
npm install http-server -g
```

#### npm install
as we install third-party packages from npm, we are creating a package.json file for our own project. Doing so turns our own project into a package, just one that isn’t published in the npm registry (yet).

```js
npm i
```
Running this command will automatically install all packages listed as dependencies or development dependencies. If you wish to leave out development dependencies, you can run the command with the --production flag.

```js
npm i --production
```


