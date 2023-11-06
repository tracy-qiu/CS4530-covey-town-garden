import { plantModel } from "../schemas";

export const findPlant  = ()               => plantModel.find();
export const createPlant = (plant)      => plantModel.create(plant);
export const deletePlant = (pid)         => plantModel.deleteOne({_id: pid});
export const updatePlant = (pid, plant) => plantModel.updateOne({_id: pid}, {$set: plant});

