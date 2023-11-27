import mongoose from 'mongoose';
import { PlantDB, plantModel } from '../schema';
import { PlantAge } from '../../types/CoveyTownSocket';

export const findPlants = (plotId: mongoose.Types.ObjectId) =>
  plantModel.find({ gardenPlotId: plotId });
export const findPlantById = (id: mongoose.Types.ObjectId) => plantModel.findById(id);
export const createPlant = (plant: PlantDB) => plantModel.create(plant);
export const deletePlant = (pid: mongoose.Types.ObjectId) => plantModel.deleteOne({ _id: pid });
export const updatePlantAge = (pid: mongoose.Types.ObjectId, plantAge: PlantAge) =>
  plantModel.updateOne({ _id: pid }, { $set: { age: plantAge } });
export const updatePlantLastWatered = (pid: mongoose.Types.ObjectId) =>
  plantModel.updateOne({ _id: pid }, { $set: { lastWatered: new Date() } });
