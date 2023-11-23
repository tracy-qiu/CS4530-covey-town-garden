type PlantId = number;

enum PlantType {
  CARROTS,
  ROSES,
  BLUEBERRIES,
}

type Plant = {
  id: PlantId;
  gardenPlotId: string;
  name: string;
  species: PlantType;
  age: number;
  daysSinceLastWater: number;
};

export { PlantId, PlantType, Plant };
