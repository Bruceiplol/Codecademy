#### Checking Node version: <br>
```node-v```<br>
<br>
#### In command line:
- type ```node``` to enter REPL (read-eval-print loop) -- the mode of using node.js
- If you’d like to type multiple lines, in node mode, type ```.editor```
  - ```control+d``` to evaluate the inpput
- open file: ```node file_name.js```
- To save developers from reinventing the wheel each time, Node.js has several built-in modules to perform common tasks efficiently. These are known as the core modules.
  - e.g. ```const events = require('events');```
  - ```require('module').builtinModules``` to access the list of core modules

---
#### The Console Module:

- ```.log()``` — to print messages to the terminal.
- ```.assert()``` — to print a message to the terminal if the value is falsy.
- ```.table()``` — to print out a table in the terminal from an object or array.

---
#### The Process Module:

- The ```process.env``` property is an object which stores and controls information about the environment in which the process is currently running.
  - a ```PWD``` property which holds a string with the directory in which the current process is located. It can be useful to have some if/else logic in a program depending on the current environment
  - One convention is to add a property to process.env with the key ```NODE_ENV``` and a value of either production or development.
    ```js
    if (process.env.NODE_ENV === 'development'){
    console.log('Testing! Testing! Does everything work?');
    }
    ```
- The ```process.memoryUsage()``` returns information on the CPU demands of the current process.
  - it returns as below
    ```js
    { rss: 26247168,
    heapTotal: 5767168,
    heapUsed: 3573032,
    external: 8772 }
    ```
  - Heap can mean different things in different contexts: a heap can refer to a specific data structure, but it can also refer to a block of computer memory. The ```process.memoryUsage().heapUsed``` method will return a number representing how many bytes of memory the current process is using.
- The ```process.argv``` property holds an array of command line values provided when the current process was initiated.
  - The first element in the array is the absolute path to Node, which ran the process.
  - The second element in the array is the path to the file that’s running.
  - The following elements will be any command line arguments provided when the process was initiated.
  ```js
  node myProgram.js testing several features
  console.log(process.argv[3]); // Prints 'several' 
  ```

---
#### The OS Module:

- Unlike process and console, the os module is not global and needs to be included into the file in order to gain access to its methods.
  - ```const os = require('os');```
- os properties:
  - ```os.type()``` — to return the computer’s operating system.
  - ```os.arch()``` — to return the operating system CPU architecture.
  - ```os.networkInterfaces()``` — to return information about the network interfaces of the computer, such as IP and MAC address.
  - ```os.homedir()``` — to return the current user’s home directory.
  - ```os.hostname()``` — to return the hostname of the operating system.
  - ```os.uptime()``` — to return the system uptime, in seconds.

---
#### The Util Module:

- Developers sometimes classify outlier functions used to maintain code and debug certain aspects of a program’s functionality as utility functions. 
- ```const util = require('util');```
- One important object is ```types```, which provides methods for runtime type checking in Node.
- Another important util method is ```.promisify()```, which turns callback functions into promises.
