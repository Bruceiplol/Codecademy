const input = 'hello world i am whale';
const vowels =['a','e','i','o','u'];
const resultArray = [];

for (let i=0; i<input.length;i++){
//  console.log('i is '+i);
  for (let j=0; j<vowels.length;j++){
//    console.log('j is '+j);
    if (input[i]===vowels[j]){
      resultArray.push(input[i]);
    }
  }
  if (input[i] === 'e' || input[i]==='u'){
    resultArray.push(input[i]);
  }
}
console.log(resultArray);

resultString = resultArray.join('').toUpperCase()
console.log(resultString);

// for...of = simplier
//const hobbies = ['singing', 'eating', 'quidditch', 'writing'];
 
//for (const hobby of hobbies) {
//  console.log(`I enjoy ${hobby}.`);
//}
