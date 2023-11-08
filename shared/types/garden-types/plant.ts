type PlantId = String;

enum PlantType {
    CARROT = "carrot",
    ROSE = "rose",
    BLUEBERRY = "blueberry"
}

// plant age: corresponds to numbers (as in DB)
enum PlantAge {
    SEEDLING,
    SPROUT,
    ADULT
}

enum PlantHealthStatus {
    Healthy = "Healthy",
    Dehydrated = "Dehydrated",
    AboutToDie = "About to Die",
    Dead = "Dead"
}

export class Plant {
    pid: PlantId;
    name: String;
    species: PlantType;
    age: PlantAge;
    status?: PlantHealthStatus;
    lastWatered: Date; // example date: "Tue Feb 05 2019 12:05:22 GMT+0530 (IST)"

    constructor(pid: String, name: String, species: PlantType) {
        this.pid = pid;
        this.name = name;
        this.species = species;
        this.age = PlantAge.SEEDLING;
        this.lastWatered = new Date();
        this.status = PlantHealthStatus.Healthy;
    }
}