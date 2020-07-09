/**
 * Hex object
 * @constructor
 * @param {number} hexType - Type of hex to create.
 * @param {number} originX - X coordinate of start position of the hex.
 * @param {number} originY - Y coordinate of start position of the hex.
 */
function Hex(hexType, originX, originY) {
  /**
   * Assigns a random economy score to the hex
   */
  this.econScore = randEconScore();

  /**
   * String for the resource the hex provides
   */
  this.resourceGivenString;

  /**
   * Resource type the hex provides
   */
  this.resourceNum = hexType;

  /**
   * Holds if the hex gives resources
   */
  this.givesResources = true;

  /**
   * Movement score for the hex
   */
  this.movementScore;

  /**
   * Defensive score for the hex
   */
  this.defensiveScore;

  /**
   * If the hex currently has units
   */
  this.hasUnits = false;

  /**
   * Keeps track of the units in the hex
   */
  this.units = [];

  /**
   * Keeps track of the amount the different unit types in the hex.
   */
  this.unitSum = new Array(numUnits);

  /**
   * Initializes the unit sum array to 0.
   */
  this.unitSum.fill(0);

  /**
   * X coordinate of start position of the hex.
   */
  this.originX = originX;

  /**
   * Y coordinate of start position of the hex.
   */
  this.originY = originY;

  /**
   * If the hex is controlled by a player
   */
  this.isControlled = false;

  /**
   * Controlling player
   */
  this.controllingPlayer;

  // Initializes hex properties based on type
  switch (hexType) {
    case ResourceEnum.IRON:
      this.resourceGivenString = "ironOre";
      break;
    case ResourceEnum.JEWEL:
      this.resourceGivenString = "jewels";
      break;
    case ResourceEnum.LEATHER:
      this.resourceGivenString = "leather";
      break;
    case ResourceEnum.SPICE:
      this.resourceGivenString = "spices";
      break;
    case ResourceEnum.STONE:
      this.resourceGivenString = "stone";
      break;
    case ResourceEnum.WOOD:
      this.resourceGivenString = "wood";
      break;
    default:
      this.givesResources = false;
      break;
  }

  // Put these in the switch statement above when terrain is implemented
  this.movementScore = 1;

  this.defensiveScore = 1;

  /**
   * Returns the resource the hex gives if the hex gives a resource.
   */
  this.getResource = function () {
    if (this.givesResources) {
      return this.resourceGivenString;
    } else {
      return null;
    }
  };

  /**
   * Adds a unit to the hex
   * @param {number} unit - Unit type to add to the hex
   */
  this.addUnit = function (unit) {
    this.units.push(unit);
    this.unitSum[unit.type]++;
    players[this.controllingPlayer].totalUnits++;
  };
}

/**
 * Generates a random econ score for the hex.
 * 50% chance of returning 2, 25% chance each of returning 1 and 3.
 */
function randEconScore() {
  var randScore = getRandomInt(4);

  if (randScore < 2) {
    return 2;
  } else if (randScore == 2) {
    return 1;
  } else {
    return 3;
  }
}
