var bank = new Bank();

var numPlayers = 4
var player = new Array(numPlayers);

let i;
for (i = 0; i < numPlayers; i++) {
    player[i] = new Player();
}

var turn = 0;
// var hex = new Hex(6);
// console.log(hex.getEconScore());

// console.log(hex.getResource())
// console.log(player[0].getIp());
player[0].incrementIp(5);
// console.log(player[0].getIp());

drawBoard();

console.log("hi!");