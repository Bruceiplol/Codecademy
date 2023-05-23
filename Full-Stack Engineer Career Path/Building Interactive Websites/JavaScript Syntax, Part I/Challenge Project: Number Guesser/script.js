let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:
const generateTarget = () =>Math.floor(Math.random()*10);
const compareGuesses = (userGuess, computerGuess, target) => {
  const userDiff = Math.abs(target- UserGuess);
  const computerDiff = Math.abs(target-computerGuess);
  return userDiff <= computerDiff;
};

const updateScore = winner => {
  if (winner==='human') {
    humanScore++;
  }
  else if (winner==='computer'){
    computerScore++;
  };
}

const advanceRound = () => currentRoundNumber++;
