// Write function below
const factorial = num => {
  if (num === 0) {
    return 1
  }
  return num * factorial(num-1)
} 

factorial(6); 
///////////////////////////////////////////////////

const factorial = n => {
  let result = 1;
  
  for (let i=n; i>0; i--) {
    result *= i;
  }

  return result;
}
