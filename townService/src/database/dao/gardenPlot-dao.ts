import { GardenPlotDB, gardenPlotModel } from '../schema';

export const findGardenPlots = () => gardenPlotModel.find();
export const findGardenPlotById = (id: string) => gardenPlotModel.findById(id);
export const createGardenPlot = (gardenPlot: GardenPlotDB) => gardenPlotModel.create(gardenPlot);
export const deleteGardenPlot = (gpid: number) => gardenPlotModel.deleteOne({ _id: gpid });
export const updateGardenPlotTopLeft = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { topLeftPlantId: plantId } });
export const updateGardenPlotTopRight = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { topRightPlantId: plantId } });
export const updateGardenPlotBottomLeft = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { bottomLeftPlantId: plantId } });
export const updateGardenPlotBottomRight = (gpid: number, plantId: string) =>
  gardenPlotModel.updateOne({ _id: gpid }, { $set: { bottomRightPlantId: plantId } });
