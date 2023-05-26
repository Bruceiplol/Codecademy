const team = {
  _players:[
    {firstName: 'Pete', lastName: 'Wheeler', age: 54},
    {firstName: 'Shohei', lastName: 'Ohtani', age: 28},
    {firstName: 'Goro', lastName: 'Shigeno', age: 20}
  ],
  _games:[
    {opponent: 'Angels', teamPoints: 10, opponentPoints: 8},
    {opponent: 'Dodgers', teamPoints: 5, opponentPoints: 7},
    {opponent: 'Royals', teamPoints: 8, opponentPoints: 3}
  ],
  get players() {
    return this._players
  },
  get games() {
    return this._games
  },
  addPlayer(newFirstName,newLastName,newAge){
    let player = {
      firstName: newFirstName,
      lastName: newLastName,
      age: newAge
    };
    this.players.push(player);
  },
  addGame(newOpponent,newTeamPoints,newOpponentPoints) {
    let game = {
      opponent: newOpponent,
      teamPoints: newTeamPoints,
      opponentPoints: newOpponentPoints
    };
    this.games.push(game);
  }
};

team.addPlayer('Bugs','Bunny',76);
team.addGame('Titans',100,98)
console.log(team.games)








