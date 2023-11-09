export type PlantId = string;

export enum PlantType {
    CARROT = 'Carrot',
    ROSE = 'Rose',
    BLUEBERRY = 'Blueberry'
}

// plant age: corresponds to numbers (as in DB)
export enum PlantAge {
    SEEDLING,
    SPROUT,
    ADULT
}

export enum PlantHealthStatus {
    Healthy = "Healthy",
    Dehydrated = "Dehydrated",
    AboutToDie = "About to Die",
    Dead = "Dead"
}

export class Plant {
    pid: PlantId;

    name: string;

    species: PlantType;

    age: PlantAge;

    status?: PlantHealthStatus;

    lastWatered: Date; // example date: "Tue Feb 05 2019 12:05:22 GMT+0530 (IST)"

    constructor(pid: string, name: string, species: PlantType) {
        this.pid = pid;
        this.name = name;
        this.species = species;
        this.age = PlantAge.SEEDLING;
        this.lastWatered = new Date();
        this.status = PlantHealthStatus.Healthy;
    }
}

export type PlantDetailsData = {
    type: PlantType;
    about: string;
    instructions: string;
    aboutImg: string;
    seedImg: string;
    sproutImg: string;
    matureImg: string;
}