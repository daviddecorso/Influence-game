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

function Hex(hexType) {
    var econScore = randEconScore();
    var resourceGiven;
    var resourceNum = hexType;
    var givesResources = true;
    var movementScore;
    var defensiveScore;

    switch(hexType) {
        case 0:
            resourceGiven = 'ironOre';
            break;
        case 1:
            resourceGiven = 'jewels';
            break;
        case 2:
            resourceGiven = 'leather';
            break;
        case 3:
            resourceGiven = 'spices';
            break;
        case 4:
            resourceGiven = 'stone';
            break;
        case 5:
            resourceGiven = 'wood';
            break;
        default:
            givesResources = false;
            break;
    }

    movementScore = 1;

    defensiveScore = 1;

    this.getEconScore = function() {
        return econScore;
    }
    this.getResource = function() {
        if (givesResources) {
            return resourceGiven;
        }
        else {
            return null;
        }
    }
    this.getMovementScore = function() {
        return movementScore;
    }
    this.getDefensiveScore = function() {
        return defensiveScore;
    }
    this.isResourceHex = function() {
        return givesResources;
    }
    this.getResourceNum = function() {
        return resourceNum;
    }

}