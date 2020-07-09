/**
 * Types of global event modifiers
 */
const globalModifierEnum = Object.freeze({
  MOVEMENT: 0,
  EpMilitaryLoss: 1,
  DEMAND: 2,
});

/**
 * Types of global event modifiers
 */
const natlModifierEnum = Object.freeze({ UPRISING: 0 });

/**
 * Total number of global events
 */
const numGlobalEvents = 3;

/**
 * Total number of national events
 */
const numNatlEvents = 1;

/**
 * Array of global event objects
 */
GlobalEvents = [
  {
    name: "Bad Weather",
    textContent:
      "An unusually long period of rain has flooded the roads \n and made movement particularly difficult for your military.",
    effect: "Movement speed -1 for all units.",
    modifierType: globalModifierEnum.MOVEMENT,
    modifier: -1,
  },
  {
    name: "Food Shortage",
    textContent:
      "This year's poor harvest has led to food shortages in your kingdom, and you must pay to import food to feed your troops.",
    effect: "-1 EP for every military unit",
    modifierType: globalModifierEnum.EpMilitaryLoss,
    modifier: -1,
  },
  {
    name: "Forest fire",
    textContent:
      "A large forest fire has caused a shortage of wood in your kingdom.",
    effect: "Wood is twice as expensive.",
    modifierType: globalModifierEnum.DEMAND,
    modifier: ResourceEnum.WOOD,
  },
];

/**
 * Array of national event objects
 */
NatlEvents = [
  {
    name: "Uprising!",
    textContent:
      "A group of malcontents has decided to openly rebel against your leadership. It will take a strong leader to handle this situation.",
    effect:
      "Spend x political points or lose x% of EPs and x% of military units",
    modifierType: natlModifierEnum.UPRISING,
    modifier: 0,
  },
];
