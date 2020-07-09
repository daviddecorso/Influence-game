/**
 * Defines the turn on which global events can begin.
 */
const globalEventStartTurn = 3;

/**
 * Defines the turn on which global events can begin.
 */
const natlEventStartTurn = 5;

/**
 * Keeps track of the turns left for a global event.
 */
let globalEventCounter = 0;

/**
 * Keeps track of the current global event.
 */
let globalEvent = 0;

/**
 * Keeps track of the current national event.
 */
let natlEvent = 0;

// Global movement modifier

/**
 * Movement modifier for global events
 * (Store this in the movement object when it's implemented.)
 */
let movementModifier = 0;

/**
 * Manages events
 */
function eventManager() {
  if (currentTurn > globalEventStartTurn) {
    // Start a global event if the current global event isn't active
    getGlobalEvent();
  }

  if (currentTurn > natlEventStartTurn) {
    // 1/4 chance of starting a national event for the current player
    if (getRandomInt(4) == 0) {
      natlEvent = getRandomInt(numNatlEvents);

      // menuId = menuEnum.NATL_EVENT;
      drawInfoMenu(menuEnum.NATL_EVENT);
    }
  }
}

/**
 * Carries out the current national event
 * @param {boolean} spent - If political points were spent on the national event.
 */
function runNationalEvent(spent) {
  switch (natlEvent) {
    case natlModifierEnum.UPRISING:
      if (spent) {
        // Subtract political points once implemented
      } else {
        // Subtract EP / military units
      }
      break;

    default:
      break;
  }
}

/**
 * Randomly selects a new global event when the current event is over.
 */
function getGlobalEvent() {
  if (globalEventCounter <= 0) {
    globalEventCounter = 2 + getRandomInt(3);
    globalEvent = getRandomInt(numGlobalEvents);

    runGlobalEvent(
      GlobalEvents[globalEvent].modifierType,
      GlobalEvents[globalEvent].modifier
    );

    menuId = menuEnum.GLOBAL_EVENT;
    drawInfoMenu(menuEnum.GLOBAL_EVENT);
  } else {
    if (currentPlayer == numPlayers - 1) {
      globalEventCounter--;
    }
  }
}

/**
 * Carries out the current global event
 * @param {number} modifierType - Type of modifier to be implemented.
 * @param {number} modifier - Specific modifier (i.e. a number/material type).
 */
function runGlobalEvent(modifierType, modifier) {
  switch (modifierType) {
    case globalModifierEnum.MOVEMENT:
      // Sets the movement modifier
      movementModifier = modifier;
      break;

    case globalModifierEnum.EpMilitaryLoss:
      // Subtract EP for every military unit for the current player.
      players[currentPlayer].ep -= players[currentPlayer].totalUnits * modifier;
      break;

    case globalModifierEnum.DEMAND:
      // Set current bank demand
      bank.resourceInDemand = modifier;
      break;

    default:
      break;
  }
}
