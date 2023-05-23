// Create a variable named myAge which set as my age as a number
const myAge = 24;

// Create a variable named earlyYears and save the value 2 to it. This variable will change.
let earlyYears = 2;

earlyYears *= 10.5;

// Since we already accounted for the first two years, take the myAge variable, and subtract 2 from it.
let laterYears = myAge - 2;

// Multiply the laterYears variable by 4 to calculate the number of dog years accounted for by your later years.
laterYears *= 4;

console.log(earlyYears);
console.log(laterYears);

// Add earlyYears and laterYears together
let myAgeInDogYears = earlyYears + laterYears;

// Write your name as a string, call its built-in method .toLowerCase(), and store the result in a variable called myName.
const myName = 'Bruce'.toLowerCase();

console.log(`My name is ${myName}. I am ${myAge} years old in human years which is ${myAgeInDogYears} years old in dog years.`)
