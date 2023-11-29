import mongoose from 'mongoose';
import { PlantDB, plantModel } from '../schema';
import { PlantAge, PlantHealthStatus } from '../../types/CoveyTownSocket';

export const findPlants = (plotId: mongoose.Types.ObjectId) =>
  plantModel.find({ gardenPlotId: plotId });
export const findPlantById = (id: mongoose.Types.ObjectId) => plantModel.findById(id);
export const createPlant = (plant: PlantDB) => plantModel.create(plant);
export const deletePlant = (pid: mongoose.Types.ObjectId) => plantModel.deleteOne({ _id: pid });
export const deletePlantsByPlot = (gpid: mongoose.Types.ObjectId) =>
  plantModel.deleteMany({ gardenPlotId: gpid });
export const deletePlantsByGarden = (gid: mongoose.Types.ObjectId) =>
  plantModel.deleteMany({ gardenId: gid });
export const updatePlantAge = (pid: mongoose.Types.ObjectId, plantAge: PlantAge) =>
  plantModel.updateOne({ _id: pid }, { $set: { age: plantAge } });
export const updatePlantLastWatered = (pid: mongoose.Types.ObjectId) =>
  plantModel.updateOne({ _id: pid }, { $set: { lastWatered: new Date() } });
export const updatePlantStatus = (pid: mongoose.Types.ObjectId, plantStatus: PlantHealthStatus) =>
  plantModel.updateOne({ _id: pid }, { $set: { status: plantStatus } });
