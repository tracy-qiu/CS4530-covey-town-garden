import mongoose from 'mongoose';
import { TownDB, townModel } from '../schema';

export const findTowns = () => townModel.find();
export const findTownByTownId = (id: string) => townModel.find({ townId: id });
export const findTownByDBTownId = (id: mongoose.Types.ObjectId) => townModel.findById(id);
export const createTown = (town: TownDB) => townModel.create(town);
export const deleteTown = (tid: mongoose.Types.ObjectId) => townModel.deleteOne({ _id: tid });
export const updateTown = (tid: number, town: TownDB) =>
  townModel.updateOne({ _id: tid }, { $set: town });
