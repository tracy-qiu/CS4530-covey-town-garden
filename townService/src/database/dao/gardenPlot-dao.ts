import { GardenPlotDB, gardenPlotModel } from '../schema';

export const findGardenPlots = () => gardenPlotModel.find();
export const findGardenPlotById = (id: string) => gardenPlotModel.findById(id);
export const createGardenPlot = (gardenPlot: GardenPlotDB) => gardenPlotModel.create(gardenPlot);
export const deleteGardenPlot = (gpid: number) => gardenPlotModel.deleteOne({ _id: gpid });
export const updateGardenPlot = (gpid: number, gardenPlot: GardenPlotDB) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: gardenPlot });
