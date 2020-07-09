function Player() {
  // Temporary
  this.name = "player";

  /**
   * Set containing the hexes controlled by the player.
   */
  this.hexesControlled = new Set();

  /**
   * Stores the amount of resources the player owns.
   */
  this.numPlayerResources = new Array(numResources);

  /**
   * Initializes numPlayerResources to 0.
   */
  for (let i = 0; i < numResources; i++) {
    this.numPlayerResources[i] = 0;
  }

  /**
   * Total number of units controlled by the player.
   */
  this.totalUnits = 0;

  /**
   * Influence points
   */
  this.ip = 0;

  /**
   * Economy points
   */
  this.ep = 0;

  /**
   * Military points
   */
  this.mp = 0;

  /**
   * Political points
   */
  this.pp = 0;

  /**
   * Sets the player's name
   * @param {string} name - Player name
   */
  this.setName = function (name) {
    name = this.name;
  };

  // Remove these
  this.incrementIp = function (numPoints) {
    this.ip += numPoints;
  };
  this.decrementIp = function (numPoints) {
    this.ip -= numPoints;
  };
  this.incrementEp = function (numPoints) {
    this.ep += numPoints;
  };
  this.decrementEp = function (numPoints) {
    this.ep -= numPoints;
  };
  this.incrementMp = function (numPoints) {
    this.mp += numPoints;
  };
  this.decrementMp = function (numPoints) {
    this.mp -= numPoints;
  };
  this.incrementPp = function (numPoints) {
    this.pp += numPoints;
  };
  this.decrementPp = function (numPoints) {
    this.pp -= numPoints;
  };

  /**
   * Increments a player's ip, ep, and ap by the specified values.
   * @param {number} ip - Number of influence points to add to the player
   * @param {number} ep - Number of economy points to add to the player
   * @param {number} mp - Number of military points to add to the player
   */
  this.incrementVals = function (ip, ep, mp) {
    this.ip += ip;
    this.ep += ep;
    this.mp += mp;
  };

  /**
   * Adds a hex to the set of hexes controlled by the player.
   * @param {number} hexNum - Hex number
   */
  this.addHex = function (hexNum) {
    this.hexesControlled.add(hexNum);
  };

  /**
   * Removes a hex to the set of hexes controlled by the player.
   * @param {number} hexNum - Hex number
   */
  this.removeHex = function (hexNum) {
    this.hexesControlled.delete(hexNum);
  };

  /**
   * Returns the set of hexes controlled by the player
   * (Unnecessary, remove later.)
   */
  this.getHexesControlled = function () {
    return this.hexesControlled;
  };
}
