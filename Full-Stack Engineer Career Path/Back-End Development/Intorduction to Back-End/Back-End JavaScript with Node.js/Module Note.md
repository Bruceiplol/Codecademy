# Modules
- Modules are reusable pieces of code in a file that can be exported and then imported for use in another file. 
- A modular program is one whose components can be separated, used individually, and recombined to create a complex system.
- find, fix, and debug code more easily.
- reuse and recycle defined logic in different parts of your application.
- keep information private and protected from other modules.
- prevent pollution of the global namespace and potential naming collisions, by cautiously selecting variables and behavior we load into a program.

#### Implementations of Modules in JavaScript: Node.js vs ES6
- The Node runtime environment and the module.exports and require() syntax.
- The browser’s runtime environment and the ES6 import/export syntax.

## Implementing Modules in Node
### module.exports
```js
/* converters.js */
function celsiusToFahrenheit(celsius) {
  return celsius * (9/5) + 32;
}

module.exports.celsiusToFahrenheit = celsiusToFahrenheit;

module.exports.fahrenheitToCelsius = function(fahrenheit) {
  return (fahrenheit - 32) * (5/9);
};
```
- Both approaches successfully store a function within the module.exports object.
- Other files can now import this object by the `require()` function.

### require()
- The `require()` function accepts a string as an argument. That string provides the file path to the module you would like to import.

```js
/* water-limits.js */
const converters = require('./converters.js');

const freezingPointC = 0;
const boilingPointC = 100;

const freezingPointF = converters.celsiusToFahrenheit(freezingPointC);
const boilingPointF = converters.celsiusToFahrenheit(boilingPointC);

console.log(`The freezing point of water in Fahrenheit is ${freezingPointF}`);
console.log(`The boiling point of water in Fahrenheit is ${boilingPointF}`);
```

#### Using Object Destructuring to be more Selective With require()
- In many cases, modules will export a large number of functions but only one or two of them are needed. You can use object destructuring to extract only the needed functions.

```js
const { celsiusToFahrenheit } = require('./converters.js');

const celsiusInput = process.argv[2]; 
const fahrenheitValue = celsiusToFahrenheit(celsiusInput);

console.log(`${celsiusInput} degrees Celsius = ${fahrenheitValue} degrees Fahrenheit`);
```
