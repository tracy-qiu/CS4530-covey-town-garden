import mongoose from 'mongoose';
import { PlantDB, plantModel } from '../schema';

export const findPlants = () => plantModel.find();
export const findPlantById = (id: string) => plantModel.findById(id);
export const createPlant = (plant: PlantDB) => plantModel.create(plant);
export const deletePlant = (pid: mongoose.Types.ObjectId) => plantModel.deleteOne({ _id: pid });
export const updatePlant = (pid: number, plant: PlantDB) =>
  plantModel.updateOne({ _id: pid }, { $set: plant });
