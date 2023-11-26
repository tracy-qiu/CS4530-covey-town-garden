import mongoose from 'mongoose';
import { GardenerDB, gardenerModel } from '../schema';

export const findGardeners = (gardenId: mongoose.Types.ObjectId) =>
  gardenerModel.find({ gardenId });
export const findGardenerById = (id: mongoose.Types.ObjectId) => gardenerModel.findById(id);
export const createGardener = (gardener: GardenerDB) => gardenerModel.create(gardener);
export const deleteGardener = (gid: mongoose.Types.ObjectId) =>
  gardenerModel.deleteOne({ _id: gid });
export const updateGardener = (gid: mongoose.Types.ObjectId, garden: GardenerDB) =>
  gardenerModel.updateOne({ _id: gid }, { $set: garden });
