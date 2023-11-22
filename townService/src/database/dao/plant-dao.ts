import mongoose from 'mongoose';
import { PlantDB, plantModel } from '../schema';
import { PlantAge } from '../../types/CoveyTownSocket';

export const findPlants = () => plantModel.find();
export const findPlantById = (id: string) => plantModel.findById(id);
export const createPlant = (plant: PlantDB) => plantModel.create(plant);
export const deletePlant = (pid: mongoose.Types.ObjectId) => plantModel.deleteOne({ _id: pid });
<<<<<<< HEAD
export const updatePlantAge = (pid: number, plantAge: PlantAge) =>
  plantModel.updateOne({ _id: pid }, { $set: { age: plantAge } });
export const updatePlantLastWatered = (pid: number) =>
  plantModel.updateOne({ _id: pid }, { $set: { lastWatered: new Date() } });
=======
export const updatePlant = (pid: number, plant: PlantDB) =>
  plantModel.updateOne({ _id: pid }, { $set: plant });
>>>>>>> add and delete plants
