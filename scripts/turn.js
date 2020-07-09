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

/**
 * Keeps track of the game state.
 */
var gameIsOver = false;

/**
 * Keeps track of the current player.
 */
var currentPlayer = 0;

/**
 * Carries out a full game turn.
 */
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

  // For testing
  console.log(
    "EVENT: " +
      GlobalEvents[globalEvent].name +
      " TURNS LEFT: " +
      globalEventCounter
  );

  // Start the 2nd half of the turn

  // End turn
}

/**
 * Lets the player choose their starting
 * hex at the beginning of the game.
 */
function setCapital() {
  // Draw at the start of the game for each player
  drawCapitalInfo();
}

/**
 * Increment the turn counter and start the next turn
 */
function endTurn() {
  if (++currentPlayer % numPlayers == 0) {
    currentPlayer = 0;
    currentTurn++;
  }
  popUpClicked = false;
  turn();
}

/**
 * Check the IP of each player to see if the
 * victory condition has been reached (1000IP)
 */
function checkHighestIP() {
  for (let i = 0; i < numPlayers; i++) {
    highestIP = Math.max(highestIP, players[i].ip);
  }

  if (highestIP < 1000) {
    gameIsOver = true;
  }
}

/**
 * Ends the game, displays the game over screen
 */
function gameOver() {
  // Display the game over screen
}

/**
 * Gives resources to the player at the start of their turn.
 * @param {number} playerNum - Player to give resources to
 */
function giveResources(playerNum) {
  for (let hex of players[playerNum].hexesControlled) {
    if (hexes[hex].givesResources) {
      players[playerNum].numPlayerResources[hexes[hex].resourceNum] +=
        hexes[hex].econScore;
    }
    /*
        // Debug:
        for (let i = 0; i < numResources; i++) {
            console.log(player[playerNum].numPlayerResources[i]);
        }
        */
  }
}

/**
 * Adds a hex to a player
 * @param {number} playerNum - Player to add territory to
 * @param {number} hexNum - Hex to add to player
 */
function addTerritory(playerNum, hexNum) {
  players[playerNum].addHex(hexNum);
  hexes[hexNum].isControlled = true;
  hexes[hexNum].controllingPlayer = playerNum;
}

/**
 * Removes a hex from a player
 * @param {number} playerNum - Player to remove territory from
 * @param {number} hexNum - Hex to remove from player
 */
function removeTerritory(playerNum, hexNum) {
  players[playerNum].removeHex(hexNum);
}
