// The forecast today is 293 Kelvin.
const kelvin = 0;

// Celsius is 273 degrees less than Kelvin.
const celsius = kelvin - 273;

// Fahrenheit is calculated by Celsius
let fahrenheit = celsius * (9/5) + 32;

// Round down the Fahrenheit temperature
fahrenheit = Math.floor(fahrenheit);

console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);
