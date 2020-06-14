var numPlayers = 4

var bank = new Bank();
var player = new Array(numPlayers);

for (let i = 0; i < numPlayers; i++) {
    player[i] = new Player();
}

/*
*  Note: This gameloop is different than most other games since the game only renders based on user input.
*  Therefore there's no need to constantly rerender the screen. This will probably get replaced with something later
*  based on turn logic and player actions.
*/

var currentTurn = 0;
var highestIP = 0;
function game() {
    drawBoard();
    turn();

    for (let i = 0; i < numPlayers; i++) {
        highestIP = Math.max(highestIP, player[i].ip);
    }

    if (highestIP < 1000) {
        // End the game
    }
}

game();