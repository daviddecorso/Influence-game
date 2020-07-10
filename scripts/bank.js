/**
 * Number of resources in the game
 */
const numResources = 6;

/**
 * Controls how much prices increase in response to demand.
 */
const buyWeight = 0.5;

/**
 * Controls the difference between the buy price and the sell price.
 */
const buyModifier = 1.15;

/**
 * Controls how much prices increase when they are "in demand" (from events).
 */
const demandModifier = 1.2;

/**
 * Stores array of resources and corresponding prices.
 * @constructor
 */
function Bank() {
  this.resourceInDemand = -1;

  this.resources = new Array(numResources);

  for (let i = 0; i < numResources; i++) {
    this.resources[i] = new Resource(i);
  }

  /**
   * Updates prices based on demand and "in demand" status.
   */
  this.updatePrices = function () {
    // Determines the buy and sell prices for resources based on their demand.
    for (let i = 0; i < numResources; i++) {
      this.resources[i].sellPrice =
        initialPrice + this.resources[i].numBought * buyWeight;
      this.resources[i].buyPrice = this.resources[i].sellPrice * buyModifier;
    }

    // Updates resource in demand
    if (this.resourceInDemand != -1) {
      this.resources[this.resourceInDemand].sellPrice *= demandModifier;
      this.resources[this.resourceInDemand].buyPrice *= demandModifier;
    }
  };
}

/**
 * Enum for resource types
 */
const ResourceEnum = Object.freeze({
  IRON: 0,
  JEWEL: 1,
  LEATHER: 2,
  SPICE: 3,
  STONE: 4,
  WOOD: 5,
});
var initialPrice = 10;

/**
 * Resource object
 * @constructor
 * @param {number} resourceType - Type of resource
 */
function Resource(resourceType) {
  /**
   * The player sells resources for this price
   */
  this.sellPrice = initialPrice;

  /**
   * The player buys resources for this price
   */
  this.buyPrice = initialPrice * buyModifier;

  /**
   * Resource type
   */
  this.type = resourceType;

  /**
   * The number of this resource bought by players this turn
   */
  this.numBought = 0;

  /**
   * The number of this resource sold by players this turn
   */
  this.numSold = 0;

  /**
   * String representing this resource
   */
  this.typeString = getTypeString(resourceType);
}

/**
 * Returns a string value for the resource.
 * @param {number} type - Resource type
 * @returns {string} resourceGiven - String representing the resource.
 */
function getTypeString(type) {
  switch (type) {
    case ResourceEnum.IRON:
      return (resourceGiven = "Iron Ore");
      break;
    case ResourceEnum.JEWEL:
      return (resourceGiven = "Jewels");
      break;
    case ResourceEnum.LEATHER:
      return (resourceGiven = "Leather");
      break;
    case ResourceEnum.SPICE:
      return (resourceGiven = "Spices");
      break;
    case ResourceEnum.STONE:
      return (resourceGiven = "Stone");
      break;
    case ResourceEnum.WOOD:
      return (resourceGiven = "Wood");
      break;
    default:
      break;
  }
}
