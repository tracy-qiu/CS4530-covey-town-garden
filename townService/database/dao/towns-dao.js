import { townModel } from "../schemas";

export const findTown  = ()          => townModel.find();
export const createTown = (town)      => townModel.create(town);
export const deleteTown = (tid)       => townModel.deleteOne({_id: tid});
export const updateTown = (tid, town) => townModel.updateOne({_id: tid}, {$set: town});

