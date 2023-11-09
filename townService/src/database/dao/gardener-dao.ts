import { GardenerDB, gardenerModel } from '../schema';

export const findGardener = () => gardenerModel.find();
export const createGardener = (garden: GardenerDB) => gardenerModel.create(garden);
export const deleteGardener = (gid: number) => gardenerModel.deleteOne({ _id: gid });
export const updateGardener = (gid: number, garden: GardenerDB) =>
  gardenerModel.updateOne({ _id: gid }, { $set: garden });
