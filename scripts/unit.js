/**
 * Enum containing unit types
 */
const unitEnum = Object.freeze({ SOLDIER: 0, ARCHER: 1, CAVALRY: 2 });

/**
 * Number of types of units in the game.
 */
const numUnits = 3;

/**
 * Unit class
 * @constructor
 * @param {number} type - Type of unit to be created
 */
function Unit(type) {
  /**
   * Type of unit
   */
  this.type = type;

  /**
   * Default number of hexes the unit can move per turn
   */
  this.movement;

  /**
   * Attack strength the unit has
   */
  this.attack;

  /**
   * Defense strength the unit has
   */
  this.defense;

  /**
   * String describing unit type
   */
  this.typeString;

  // Add parameter for controlling player?

  switch (type) {
    case unitEnum.SOLDIER:
      this.typeString = "Soldier";
      this.attack = 2;
      this.defense = 3;
      this.movement = 2;
      break;

    case unitEnum.ARCHER:
      this.typeString = "Archer";
      this.attack = 1;
      this.defense = 4;
      this.movement = 1;
      break;

    case unitEnum.CAVALRY:
      this.typeString = "Cavalry";
      this.attack = 4;
      this.defense = 3;
      this.movement = 3;
    default:
      break;
  }
}
