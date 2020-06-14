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
*/
var currentPlayer = 0;
function turn() {
    // Update prices
    bank.updatePrices();

    // Give starting resources
    giveResources(currentPlayer);

    // Events manager

    // Start the 2nd half of the turn

    // End turn
}

function giveResources(playerNum) {
    for (let i = 0; i < player[playerNum].hexesControlled.size; i++) {
        if (hexes[hexesControlled.get(i)].givesResources) {
            player[playerNum].numPlayerResources[hexes[hexesControlled.get(i)].resourceNum]++;
        }
    }
}

function addTerritory(playerNum, hexNum) {
    player[playerNum].addHex(hexNum);
}

function removeTerritory(playerNum, hexNum) {
    player[playerNum].removeHex(hexNum);
}