const numResources = 6;
var buyWeight = .5;
var sellModifier = 1.15;
function Bank() {
    this.resourceInDemand = "None";

    this.resources = new Array(numResources);

    for (let i = 0; i < numResources; i++) {
        this.resources[i] = new Resource(i);
    }

    this.updatePrices = function() {
        for (let i = 0; i < numResources; i++) {
            this.resources[i].buyPrice = initialPrice + this.resources[i].numBought * buyWeight;
            this.resources[i].sellPrice = this.resources[i].buyPrice * sellModifier;
        }

        // Update this when events system is built.
        resourceInDemand = this.resources[0].typeString;
    }
}

const ResourceEnum = Object.freeze({"IRON" : 0, "JEWEL" : 1, "LEATHER" : 2, "SPICE" : 3,  "STONE" : 4, "WOOD" : 5});
var initialPrice = 10;
function Resource(resourceType) {
    // The bank buys resources for this price
    this.buyPrice = initialPrice;

    // The bank sells resources for this price
    this.sellPrice = initialPrice * sellModifier;

    // Resource type
    this.type = resourceType;

    // The number of resources bought by players this turn
    this.numBought = 0;

    // The number of resources sold by players this turn
    this.numSold = 0;

    // String representing this resource
    this.typeString = getTypeString(resourceType);
}

function getTypeString(type) {
    switch(type) {
        case ResourceEnum.IRON:
            return resourceGiven = 'Iron Ore';
            break;
        case ResourceEnum.JEWEL:
            return resourceGiven = 'Jewels';
            break;
        case ResourceEnum.LEATHER:
            return resourceGiven = 'Leather';
            break;
        case ResourceEnum.SPICE:
            return resourceGiven = 'Spices';
            break;
        case ResourceEnum.STONE:
            return resourceGiven = 'Stone';
            break;
        case ResourceEnum.WOOD:
            return resourceGiven = 'Wood';
            break;
        default:
            break;
    }
}