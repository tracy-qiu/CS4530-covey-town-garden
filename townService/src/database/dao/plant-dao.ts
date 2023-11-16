import { PlantDB, plantModel } from '../schema';

export const findPlants = () => plantModel.find();
export const findPlantById = (id: number) => plantModel.findById(id);
export const createPlant = (plant: PlantDB) => plantModel.create(plant);
export const deletePlant = (pid: number) => plantModel.deleteOne({ _id: pid });
export const updatePlant = (pid: number, plant: PlantDB) =>
  plantModel.updateOne({ _id: pid }, { $set: plant });
