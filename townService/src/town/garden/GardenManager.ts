// manage the garden database

import {
  PlantId,
  PlantType,
  PlantAge,
  Plant,
  PlantHealthStatus,
} from '../../types/CoveyTownSocket';

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
  name: string,
  species: PlantType,
  age: PlantAge,
  lastWatered: Date,
  status: PlantHealthStatus,
): PlantId {
  const newID = PlantIDManager.newID().toString();
  allPlants.push({ pid: newID, name, species, age, status, lastWatered });
  return newID;
}

// initialize mock data
export function initialize(): void {
  allPlants = [];
  addPlant('Carrots', 'carrot', 'seedling', new Date(), 'healthy');
  addPlant('Roses', 'rose', 'adult', new Date(), 'dehydrated');
  addPlant('Blueberries', 'blueberry', 'sprout', new Date(), 'about to die');
}

export function getAll(): Plant[] {
  return allPlants;
}

// gets transcript for given ID.  Returns undefined if missing
export function getPlant(plantID: string): Plant | undefined {
  return allPlants.find(plant => plant.pid === plantID);
}
