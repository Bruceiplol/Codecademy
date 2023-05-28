// Write your code here:
const convertToBaby = arr => {
  let babyArray=[];
  for (word of arr) {
    babyArray.push('baby ' + word)
  }
  return babyArray
}

// When you're ready to test your code, uncomment the below and run:

const animals = ['panda', 'turtle', 'giraffe', 'hippo', 'sloth', 'human'];

console.log(convertToBaby(animals)) 

// not allowed to use .map()
