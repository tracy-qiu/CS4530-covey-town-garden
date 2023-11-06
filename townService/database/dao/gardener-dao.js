import { gardenerModel } from "../schemas";

export const findGardeners  = ()               => gardenerModel.find();
export const createGardener = (gardener)      => gardenerModel.create(gardener);
export const deleteGardener = (gid)         => gardenerModel.deleteOne({_id: gid});
export const updateGardener = (gid, gardener) => gardenerModel.updateOne({_id: gid}, {$set: gardener});

