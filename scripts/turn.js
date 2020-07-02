/*
* In a turn:
* 1ST HALF:
* 1. Call the bank
* 2. Events pop up
* 3. Collect economic resources
* - Claim new territory
* - Build improvements
* - Build military units
* - Sell things to the bank
*
* 2ND HALF:
* 1. Move units
* 2. Battles
*
* (See rules pdf for more detail)
*/
var gameIsOver = false;
var currentPlayer = 0;
function turn() {
    // For testing
    console.log("TURN: " + currentTurn + " PLAYER: " + currentPlayer);

    // Checks to see if the game is over
    if (gameIsOver) {
        gameOver();
    }

    // Players need to select a capital hex at the start of the game.
    if (currentTurn == 0) {
        setCapital();
    }
    // This condition is just for testing.
    else if (currentTurn == 1) {
        hexes[0].addUnit(new Unit(unitEnum.ARCHER));
        addTerritory(0, 10);
        hexes[10].addUnit(new Unit(unitEnum.SOLDIER));
    }

    // Update prices
    bank.updatePrices();

    // Give starting resources
    giveResources(currentPlayer);

    // Events manager
    eventManager();
    console.log("EVENT: " + GlobalEvents[globalEvent].name + " TURNS LEFT: " + globalEventCounter);

    // Start the 2nd half of the turn

    // End turn
}

function setCapital() {
    // Draw at the start of the game for each player
    drawCapitalInfo();
}

// Increment turn counter and start the next turn
function endTurn() {
    if (++currentPlayer % numPlayers == 0) {
        currentPlayer = 0;
        currentTurn++;
    }
    popUpClicked = false;
    turn();
}

function checkHighestIP() {
    for (let i = 0; i < numPlayers; i++) {
        highestIP = Math.max(highestIP, players[i].ip);
    }

    if (highestIP < 1000) {
        gameIsOver = true;
    }
}

function gameOver() {
    // Display the game over screen
}

function giveResources(playerNum) {
    for (let hex of players[playerNum].hexesControlled) {
        if(hexes[hex].givesResources) {
            players[playerNum].numPlayerResources[hexes[hex].resourceNum] += hexes[hex].econScore;
        }
        /*
        // Debug:
        for (let i = 0; i < numResources; i++) {
            console.log(player[playerNum].numPlayerResources[i]);
        }
        */
    }
}

function addTerritory(playerNum, hexNum) {
    players[playerNum].addHex(hexNum);
    hexes[hexNum].isControlled = true;
    hexes[hexNum].controllingPlayer = playerNum;
}

function removeTerritory(playerNum, hexNum) {
    players[playerNum].removeHex(hexNum);
}