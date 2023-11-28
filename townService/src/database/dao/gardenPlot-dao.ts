import mongoose from 'mongoose';
import { GardenPlotDB, gardenPlotModel } from '../schema';

export const findGardenPlots = (gid: mongoose.Types.ObjectId) =>
  gardenPlotModel.find({ gardenId: gid });
export const findGardenPlotById = (gpid: mongoose.Types.ObjectId) => gardenPlotModel.findById(gpid);
export const createGardenPlot = (gardenPlot: GardenPlotDB) => gardenPlotModel.create(gardenPlot);
export const deleteGardenPlot = (gpid: mongoose.Types.ObjectId) =>
  gardenPlotModel.deleteOne({ _id: gpid });
export const updateGardenPlot = (
  gpid: mongoose.Types.ObjectId,
  plantId: mongoose.Types.ObjectId,
  plotLocation: number,
) =>
  gardenPlotModel.updateOne(
    { '_id': gpid, 'plants.plotPlantId': `${plotLocation}` },
    { $set: { 'plants.$.plant': plantId } },
  );
