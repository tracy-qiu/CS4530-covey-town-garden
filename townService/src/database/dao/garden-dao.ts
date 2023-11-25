import { GardenDB, gardenModel } from '../schema';

export const findGardens = () => gardenModel.find();
export const findGardenById = (id: string) => gardenModel.findById(id);
export const createGarden = (garden: GardenDB) => gardenModel.create(garden);
export const deleteGarden = (gid: number) => gardenModel.deleteOne({ _id: gid });
export const updateGarden = (gid: number, garden: GardenDB) =>
  gardenModel.updateOne({ _id: gid }, { $set: garden });
