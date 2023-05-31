/*
For this project, you will build a message generator program. Every time a user runs a program, they should get a new, 
randomized output. You’re welcome to take the project in a couple of different forms, like an astrology generator, 
inspirational message, or nonsensical jokes. To make your program truly random,
the message that it outputs should be made up of at least three different pieces of data.
Take what you know of JavaScript syntax so far to build the program and customize it to your liking.
*/

//1 function to generate random num of choice
//2 function of combination of different subject, verb, sentence
//3 format to join the entire sentence


//Welcome Message
function welcome() {
    console.log('Welcome to the inspirational message generator! \n\nHere is today\'s message:')
}

// function to generate random index
function generateRandomNumber (num) {
    return Math.floor(Math.random() * num)
}

// Define messages
const subjects = ['You', 'Dreamers', 'Believers', 'Champions', 'Warriors'];
const verbs = ['can achieve', 'have the power to', 'will overcome', 'are destined to', 'are capable of'];
const sentences = ['greatness!', 'anything you set your mind to!', 'incredible things!', 'your dreams!', 'success!'];

// Function to generate an inspirational message
function generateMessage() {
  const subject = subjects[generateRandomNumber(subjects.length)];
  const verb = verbs[generateRandomNumber(verbs.length)];
  const sentence = sentences[generateRandomNumber(sentences.length)];

  return `${subject} ${verb} ${sentence}`;
}

// Generate and display a message
const generator = () => {
    welcome();
    console.log(generateMessage());
}

generator()
