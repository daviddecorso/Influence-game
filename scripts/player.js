function Player() {
    var ip, ep, mp;
    let hexesControlled = [];
    var name = "player";

    // Influence points
    ip = 0;

    // Economy points
    ep = 0;

    // Military points
    mp = 0;

    // Political points
    pp = 0;

    this.getIp = function() {
        return ip;
    }
    this.getEp = function() {
        return ep;
    }
    this.getMp = function() {
        return mp;
    }
    this.getPp = function() {
        return pp;
    }

    this.setName = function(name) {
        name = this.name;
    }
    this.incrementIp = function(numPoints) {
        ip += numPoints;
    }
    this.decrementIp = function(numPoints) {
        ip -= numPoints;
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

    this.addTerritory = function(hexNum) {
        hexesControlled.push(hexNum);
    }

    this.getHexesControlled = function() {
        return hexesControlled;
    }
}