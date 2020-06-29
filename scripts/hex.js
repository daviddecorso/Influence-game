function Hex(hexType, originX, originY) {
    this.econScore = randEconScore();
    this.resourceGiven;
    this.resourceNum = hexType;
    this.givesResources = true;
    this.movementScore;
    this.defensiveScore;
    this.hasUnits = false;
    this.units = [];
    this.unitSum = new Array(numUnits);
    this.unitSum.fill(0);
    this.originX = originX;
    this.originY = originY;
    this.isControlled = false;
    this.controllingPlayer;

    switch(hexType) {
        case ResourceEnum.IRON:
            this.resourceGiven = 'ironOre';
            break;
        case ResourceEnum.JEWEL:
            this.resourceGiven = 'jewels';
            break;
        case ResourceEnum.LEATHER:
            this.resourceGiven = 'leather';
            break;
        case ResourceEnum.SPICE:
            this.resourceGiven = 'spices';
            break;
        case ResourceEnum.STONE:
            this.resourceGiven = 'stone';
            break;
        case ResourceEnum.WOOD:
            this.resourceGiven = 'wood';
            break;
        default:
            this.givesResources = false;
            break;
    }

    // Put these in the switch statement above when terrain is implemented
    this.movementScore = 1;

    this.defensiveScore = 1;

    this.getResource = function() {
        if (this.givesResources) {
            return this.resourceGiven;
        }
        else {
            return null;
        }
    }

    this.addUnit = function(unit) {
        this.units.push(unit);
        this.unitSum[unit.type]++;
    }
}

// 50% chance of returning 2, 25% chance each of returning 1 and 3.
function randEconScore() {
    var randScore = getRandomInt(4);

    if (randScore < 2) {
        return 2;
    }
    else if (randScore == 2) {
        return 1;
    }
    else {
        return 3;
    }
}