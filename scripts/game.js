var numPlayers = 4

var bank = new Bank();
var player = new Array(numPlayers);

for (let i = 0; i < numPlayers; i++) {
    player[i] = new Player();
}

/*
    Need something here to start game so things are loaded in
    (Also will have a starting menu)
*/

var currentTurn = 0;
var highestIP = 0;

drawBoard();
turn();