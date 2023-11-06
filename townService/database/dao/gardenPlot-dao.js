import { gardenPlotModel } from "../schemas";

export const findGardenPlot  = ()               => gardenPlotModel.find();
export const createGardenPlot = (gardenPlot)      => gardenPlotModel.create(gardenPlot);
export const deleteGardenPlot = (gpid)         => gardenPlotModel.deleteOne({_id: gpid});
export const updateGardenPlot = (gpid, gardenPlot) => gardenPlotModel.updateOne({_id: gpid}, {$set: gardenPlot});

