import mongoose from 'mongoose';
import { GardenPlotDB, gardenPlotModel } from '../schema';

export const findGardenPlots = (gid: mongoose.Types.ObjectId) =>
  gardenPlotModel.find({ gardenId: gid });
export const findGardenPlotById = (gpid: mongoose.Types.ObjectId) => gardenPlotModel.findById(gpid);
export const createGardenPlot = (gardenPlot: GardenPlotDB) => gardenPlotModel.create(gardenPlot);
export const deleteGardenPlot = (gpid: mongoose.Types.ObjectId) =>
  gardenPlotModel.deleteOne({ _id: gpid });
export const updateGardenPlotTopLeft = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { topLeftPlantId: plantId } });
export const updateGardenPlotTopRight = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { topRightPlantId: plantId } });
export const updateGardenPlotBottomLeft = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { bottomLeftPlantId: plantId } });
export const updateGardenPlotBottomRight = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { bottomRightPlantId: plantId } });
