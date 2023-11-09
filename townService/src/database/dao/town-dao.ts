import { TownDB, townModel } from '../schema';

export const findTowns = () => townModel.find();
export const createTown = (town: TownDB) => townModel.create(town);
export const deleteTown = (tid: number) => townModel.deleteOne({ _id: tid });
export const updateTown = (tid: number, town: TownDB) =>
  townModel.updateOne({ _id: tid }, { $set: town });
