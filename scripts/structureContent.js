/**
 * Total number of structures
 */
const numStructures = 2;

/**
 * Types of structures
 */
const structureTypeEnum = Object.freeze({
  ECONOMY: 0,
  MILITARY: 1,
  MOVEMENT: 2,
  PRODUCTION: 3,
});

/**
 *
 */

const structureModifierEnum = Object.freeze({
  scaleMovementCost: 0,
  setMovementCost: 1,
  militaryProdModifier: 2,
});

/**
 * Array of structure objects
 */

Structures = [
  {
    name: "Barracks",
    effect: "units produced 2 turns quicker.",
    type: structureTypeEnum.PRODUCTION,
    time: 4,
    modifierType: structureModifierEnum.militaryProdModifier,
    modifier: 2,
  },
  {
    name: "Road",
    effect: "Halves the movement cost for a given hex.",
    buff: "1/2 movement cost.",
    type: structureTypeEnum.MOVEMENT,
    cost: 10,
    time: 2,
    modifierType: structureModifierEnum.scaleMovementCost,
    modifier: 0.5,
  },
  {
    name: "Bridge",
    effect: "movement cost = 1.",
    type: structureTypeEnum.MOVEMENT,
    time: 3,
    modifierType: structureModifierEnum.setMovementCost,
    modifier: 1,
  },
];
