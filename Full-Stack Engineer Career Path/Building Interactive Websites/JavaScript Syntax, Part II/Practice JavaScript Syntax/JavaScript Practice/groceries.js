/*
Write a function groceries() that takes an array of object literals of grocery items. The function should return a string with each item separated by a comma except the last two items should be separated by the word 'and'. Make sure spaces (' ') are inserted where they are appropriate.

Examples:

groceries( [{item: 'Carrots'}, {item: 'Hummus'}, {item: 'Pesto'}, {item: 'Rigatoni'}] );
// returns 'Carrots, Hummus, Pesto and Rigatoni'
 
groceries( [{item: 'Bread'}, {item: 'Butter'}] );
// returns 'Bread and Butter'
 
groceries( [{item: 'Cheese Balls'}] );
// returns 'Cheese Balls'
*/

// Write function below
const groceries = arr => {
  let str =""
  for (let i =0; i<arr.length;i++) {
    str += arr[i].item
    if (arr.length - i >2) {
      str+= ", "
    } else if (arr.length -i === 2) {
      str+= " and "
    }
  }
  return str
}
