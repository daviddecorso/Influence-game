const unitEnum = Object.freeze({"SOLDIER" : 0, "ARCHER" : 1, "CAVALRY" : 2});
const numUnits = 3;
function Unit(type) {
    this.type = type;
    this.movement;
    this.attack;
    this.defense;
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