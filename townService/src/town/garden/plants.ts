type PlantId = number;

enum PlantType {
  CARROT = 'carrot',
  ROSE = 'rose',
  BLUEBERRY = 'blueberry',
}

// plant age: corresponds to numbers (as in DB)
enum PlantAge {
  SEEDLING,
  SPROUT,
  ADULT,
}

enum PlantHealthStatus {
  Healthy = 'Healthy',
  Dehydrated = 'Dehydrated',
  AboutToDie = 'About to Die',
  Dead = 'Dead',
}

type Plant = {
  pid: PlantId;

  name: string;

  species: PlantType;

  age: PlantAge;

  status?: PlantHealthStatus;

  lastWatered: Date; // example date: "Tue Feb 05 2019 12:05:22 GMT+0530 (IST)"
};

export { PlantId, PlantType, PlantAge, PlantHealthStatus, Plant };
