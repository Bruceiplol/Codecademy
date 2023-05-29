// Write function below
const subLength = (str, char) => {
  let charCount = 0;
  let len = -1;
  
  for (let i=0; i<str.length; i++) {
    if (str[i] == char) {
      charCount++;
      if (charCount > 2) {
        return 0;
      }
      if (len == -1) {
        len = i;
      } else {
        len = i - len + 1
      }
    }
  }
  if (charCount < 2) {
    return 0;
  }

  return len;
};
