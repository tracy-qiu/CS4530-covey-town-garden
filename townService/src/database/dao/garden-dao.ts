import mongoose from 'mongoose';
import { GardenDB, gardenModel } from '../schema';

export const findGardens = () => gardenModel.find();
export const findGardenById = (gid: mongoose.Types.ObjectId) => gardenModel.findById(gid);
export const findGardenByTownId = (tid: string) => gardenModel.find({ townId: tid });
export const createGarden = (garden: GardenDB) => gardenModel.create(garden);
export const deleteGarden = (gid: mongoose.Types.ObjectId) => gardenModel.deleteOne({ _id: gid });
export const deleteGardenPlot = (gid: mongoose.Types.ObjectId, pid: string) =>
  gardenModel.updateOne({ _id: gid }, { $pull: { gardenPlots: pid } });
export const updateGarden = (gid: mongoose.Types.ObjectId, plotId: string) =>
  gardenModel.updateOne({ _id: gid }, { $push: { gardenPlots: plotId } });
