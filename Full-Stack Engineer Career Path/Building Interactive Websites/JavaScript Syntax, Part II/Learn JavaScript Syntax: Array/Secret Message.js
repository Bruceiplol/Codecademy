let secretMessage = ['Learning', 'is', 'not', 'about', 'what', 'you', 'get', 'easily', 'the', 'first', 'time,', 'it', 'is', 'about', 'what', 'you', 'can', 'figure', 'out.', '-2015,', 'Chris', 'Pine,', 'Learn', 'JavaScript'];

console.log(secretMessage.length);
//1 remove the last string of the array
secretMessage.pop();
//2 You can check your work by logging the .length of the array.
console.log(secretMessage.length);
//3 add the words to and Program as separate strings to the end
secretMessage.push('to','Program');
//4 Change the word easily to the word right by accessing the index and replacing it.
secretMessage[secretMessage.indexOf('easily')] = 'right';
//5 remove the first string of the array.
secretMessage.shift();
//6 add the string Programming to the beginning of the array
secretMessage.unshift('Programming');
//7 remove the strings get, right, the, first, time,, and replace them with the single string know,.
//array.splice(indexToStart, numberOfIndices, 'stringToAdd');
secretMessage.splice(secretMessage.indexOf('get'), 5, 'know,');
//8 print the secret message as a sentence.
console.log(secretMessage.join(" "))
