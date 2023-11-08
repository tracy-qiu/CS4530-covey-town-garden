// manage the garden database

import { PlantId, PlantType, Plant } from './plants';

// the database of transcript
let allPlants: Plant[] = [];

// manages the plant IDs
class PlantIDManager {
  private static _lastUsedID = 0;

  public static newID(): number {
    this._lastUsedID++;
    return this._lastUsedID;
  }
}

// addsPlants
export function addPlant(
  gardenPlotId: string,
  name: string,
  species: PlantType,
  age: number,
  daysSinceLastWater: number,
): PlantId {
  const newID = PlantIDManager.newID();
  allPlants.push({ id: newID, gardenPlotId, name, species, age, daysSinceLastWater });
  return newID;
}

// initialize mock data
export function initialize(): void {
  allPlants = [];
  addPlant('P1', 'Carrots', PlantType.CARROTS, 1, 1);
  addPlant('P2', 'Roses', PlantType.ROSES, 3, 4);
  addPlant('P3', 'Blueberries', PlantType.BLUEBERRIES, 5, 2);
}

export function getAll(): Plant[] {
  return allPlants;
}

// gets transcript for given ID.  Returns undefined if missing
export function getPlant(plantID: number): Plant | undefined {
  return allPlants.find(plant => plant.id === plantID);
}
