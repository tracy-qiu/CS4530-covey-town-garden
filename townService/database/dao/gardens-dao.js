import { gardenModel } from "../schemas";

export const findGarden  = ()               => gardenModel.find();
export const createGarden = (garden)      => gardenModel.create(garden);
export const deleteGarden = (gid)         => gardenModel.deleteOne({_id: gid});
export const updateGarden = (gid, garden) => gardenModel.updateOne({_id: gid}, {$set: garden});

