type PlantId = String;

// Instead of database, define in backend??
enum PlantType {
    CARROTS,
    ROSES,
    BLUEBERRIES
}

class Plant {
    id: PlantId;
    gardenPlotId: String;
    name: String;
    species: PlantType;
    age: Number;
    daysSinceLastWater: Number;

    constructor(gardenPlotId: String, name: String, species: PlantType, age: Number, daysSinceLastWater: Number) {
        this.gardenPlotId = gardenPlotId;
        this.name = name;
        this.species = species;
        this.age = age;
        this.daysSinceLastWater = daysSinceLastWater;
    }
}