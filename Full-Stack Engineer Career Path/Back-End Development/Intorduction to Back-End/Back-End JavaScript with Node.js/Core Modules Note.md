# Outline
- The ```events``` module provides ```EventEmitter``` objects used to assign listener functions triggered on specified events.
- The ```buffer``` module is used to handle binary data. In app.js, a ```Buffer``` object is being created and then converted to a string.
- The ```fs``` module is used to interact with the user’s filesystem. In app.js, a statement is logged that verifies that a file was provided in a callback function.
- The ```timer``` module provides the ```setImmediate()``` function which runs immediately after the current poll phase is completed. Take note of when ```'Welcome to Node.js'``` is logged to the terminal.

---
## The Events Module
```js
// Require in the 'events' core module
let events = require('events');

// Create an instance of the EventEmitter class
let myEmitter = new events.EventEmitter();
```

- ```.on('eventName', eventListener)```
- ```.emit('eventName', eventListnerParams)```

```js
let newUserListener = (data) => {
  console.log(`We have a new user: ${data}.`);
};

// Assign the newUserListener function as the listener callback for 'new user' events
myEmitter.on('new user', newUserListener)

// Emit a 'new user' event
myEmitter.emit('new user', 'Lily Pad') //newUserListener will be invoked with 'Lily Pad'
```

---
### User Input/Output
- In the Node environment, the console is the terminal, and the ```console.log()``` method is a “thin wrapper” on the ```.stdout.write()``` method of the ```process``` object. ```stdout``` stands for standard output.
- In Node, we can also receive input from a user through the terminal using the stdin.on() method on the process object:
  ```js
  process.stdin.on('data', (userInput) => {
    let input = userInput.toString()
    console.log(input)
  });
  ```
  - Here, we were able to use ```.on()``` because under the hood ```process.stdin``` is an instance of ```EventEmitter```.
  - The ```userInput``` we receive is an instance of the Node ```Buffer``` class, so we convert it to a string before printing.

---
## The Error Module
- the ```error``` module is within the global scope — there is no need to import the module with the ```require()``` statement.
- Many asynchronous Node APIs use error-first callback functions—callback functions which have an error as the first expected argument and the data as the second argument.
```js
const errorFirstCallback = (err, data)  => {
  if (err) {
    console.log(`There WAS an error: ${err}`);
  } else {
    // err was falsy
    console.log(`There was NO error. Event data: ${data}`);
  }
}
```
## The Buffer Module
- The ```Buffer``` module is within the global scope
- the ```Buffer``` module is used to handle binary data.
- The ```Buffer``` module provides a variety of methods to handle the binary data such as ```.alloc()```, ```.toString()```, ```.from()```, and ```.concat()```.
  - The ```.alloc()``` method creates a new Buffer object with the size specified as the first parameter. ```.alloc()``` accepts three arguments:
    - Size: Required. The size of the buffer
    - Fill: Optional. A value to fill the buffer with. Default is 0.
    - Encoding: Optional. Default is UTF-8.
    ```js
    const buffer = Buffer.alloc(5);
    console.log(buffer); // Ouput: [0, 0, 0, 0, 0]
    ```
  - The ```.toString()``` method translates the Buffer object into a human-readable string. It accepts three optional arguments:
    - Encoding: Default is UTF-8.
    - Start: The byte offset to begin translating in the Buffer object. Default is 0.
    - End: The byte offset to end translating in the Buffer object. Default is the length of the buffer. The start and end of the buffer are similar to the start and end of an array, where the first element is 0 and increments upwards.
    ```js
    const buffer = Buffer.alloc(5, 'a');
    console.log(buffer.toString()); // Output: aaaaa
    ```
  - The ```.from()``` method is provided to create a new ```Buffer``` object from the specified string, array, or buffer. The method accepts two arguments:
    - Object: Required. An object to fill the buffer with.
    - Encoding: Optional. Default is UTF-8.
    ```js
    const buffer = Buffer.from('hello');
    console.log(buffer); // Output: [104, 101, 108, 108, 111]
    ```
  - The ```.concat()``` method joins all buffer objects passed in an array into one ```Buffer``` object. ```.concat()``` comes in handy because a ```Buffer``` object can’t be resized. This method accepts two arguments:
    - Array: Required. An array containing Buffer objects.
    - Length: Optional. Specifies the length of the concatenated buffer.
    ```js
    const buffer1 = Buffer.from('hello'); // Output: [104, 101, 108, 108, 111]
    const buffer2 = Buffer.from('world'); // Output:[119, 111, 114, 108, 100]
    const array = [buffer1, buffer2];
    const bufferConcat = Buffer.concat(array);
    
    console.log(bufferConcat); // Output: [104, 101, 108, 108, 111, 119, 111, 114, 108, 100]
    ```

---
## The FS Module
- When running JavaScript code on a browser, it’s important for a script to have only limited access to a user’s filesystem.
  - This technique of isolating some applications from others is known as sandboxing.
  - Sandboxing protects users from malicious programs and invasions of privacy.
- The Node ```fs``` core module is an API for interacting with the file system.
- One method available on the fs core module is the .readFile() method which reads data from a provided file:
  ```js
  const fs = require('fs');
  
  let readDataCallback = (err, data) => {
    if (err) {
      console.log(`Something went wrong: ${err}`);
    } else {
      console.log(`Provided file contained: ${data}`);
    }
  };
  
  fs.readFile('./file.txt', 'utf-8', readDataCallback);
  ```
  - We required in the ```fs``` core module.
  - We invoked the ```.readFile()``` method with three arguments:
    - The first argument is a string that contains a path to the file file.txt.
    - The second argument is a string specifying the file’s character encoding (usually ‘utf-8’ for text files).
    - The third argument is the callback function to be invoked when the asynchronous task of reading from the file system is complete. Node will pass the contents of file.txt into the provided callback as its second argument.


### Readable Streams
- In more realistic scenarios, data isn’t processed all at once but rather sequentially, piece by piece, in what is known as a stream.
- To read files line-by-line, we can use the ```.createInterface()``` method from the ```readline``` core module. 
  - ```.createInterface()``` returns an ```EventEmitter``` set up to emit ```'line'``` events:
```js
const readline = require('readline');
const fs = require('fs');

const myInterface = readline.createInterface({
  input: fs.createReadStream('text.txt')
});

myInterface.on('line', (fileLine) => {
  console.log(`The line read: ${fileLine}`);
});
```
- We require in the ```readline``` and ```fs``` core modules.
- We assign to `myInterface` the returned value from invoking `readline.createInterface()` with an object containing our designated `input`.
- We set our `input` to `fs.createReadStream('text.txt')` which will create a stream from the *text.txt* file.
- Next we assign a listener callback to execute when `line` events are emitted. A `'line'` event will be emitted after each line from the file is read.
- Our listener callback will log to the console `'The line read: [fileLine]'`, where `[fileLine]` is the line just read.

### Writeable Streams
- We can create a writeable stream to a file using the `fs.createWriteStream()` method:
```js
const fs = require('fs')

const fileStream = fs.createWriteStream('output.txt');

fileStream.write('This is the first line!'); 
fileStream.write('This is the second line!');
fileStream.end();
```

---
## The Timers Module
- the `timer` module are global.
- some timer functions such as, `setTimeout()` and `setInterval()`
- the difference from front-end is that they are added to the Node.js event loop. This means that the timer functions are scheduled and put into a queue.
  - If a timer function is executed outside of a module, the behavior will be random (non-deterministic).
- `setImmediate()`
  - it is often compared with the `setTimeout()` function
  - When `setImmediate()` is called, it executes the specified callback function after the current (poll phase) is completed.
  - the method accepts two parameters: the callback function (required) and arguments for the callback function (optional).
  ```js
  setImmediate(() => {
    console.log('Hello! My name is Codey.')
  });
  ```
  
