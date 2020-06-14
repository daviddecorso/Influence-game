function Player() {
    this.name = "player";

    this.hexesControlled = new Set();

    this.numPlayerResources = new Array(numResources);

    // Influence points
    this.ip = 0;

    // Economy points
    this.ep = 0;

    // Military points
    this.mp = 0;

    // Political points
    this.pp = 0;

    this.setName = function(name) {
        name = this.name;
    }

    // Remove these
    this.incrementIp = function(numPoints) {
        this.ip += numPoints;
    }
    this.decrementIp = function(numPoints) {
        this.ip -= numPoints;
    }
    this.incrementEp = function(numPoints) {
        this.ep += numPoints;
    }
    this.decrementEp = function(numPoints) {
        this.ep -= numPoints;
    }
    this.incrementMp = function(numPoints) {
        this.mp += numPoints;
    }
    this.decrementMp = function(numPoints) {
        this.mp -= numPoints;
    }
    this.incrementPp = function(numPoints) {
        this.pp += numPoints;
    }
    this.decrementPp = function(numPoints) {
        this.pp -= numPoints;
    }

    this.incrementVals = function(ip, ep, ap) {
        this.ip += ip;
        this.ep += ep;
        this.ap += ap;
    }

    this.addHex = function(hexNum) {
        this.hexesControlled.add(hexNum);
    }

    this.removeHex = function (hexNum) {
        this.hexesControlled.delete(hexNum);
    }

    this.getHexesControlled = function() {
        return this.hexesControlled;
    }
}