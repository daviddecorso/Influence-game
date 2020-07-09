/**
 * Number of players in the game
 */
var numPlayers = 4;

/**
 * Initializes and stores the bank
 */
var bank = new Bank();

/**
 * Initializes and stores the array of player objects
 */
var players = new Array(numPlayers);
for (let i = 0; i < numPlayers; i++) {
  players[i] = new Player();
}

/*
    Need something here to start game so things are loaded in
    (Also will have a starting menu)
*/

/**
 * Current turn
 */
var currentTurn = 0;

/**
 * Highest IP
 */
var highestIP = 0;

// Draw the board.
drawBoard();

// Starts the turn loop.
turn();
