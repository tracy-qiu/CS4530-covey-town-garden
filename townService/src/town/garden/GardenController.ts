import { Controller, Get, Path, Route, Post, Body } from 'tsoa';
import mongoose from 'mongoose';
import { PlantId } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import { validateTownExists, validateGardenDoesNotExistInTown } from './GardenUtil';
import { GardenCreateParams } from '../../api/Model';

// replace with env variable ( ref docs )

export function connectToGardenDB() {
  const connectionString =
    'mongodb+srv://surabhiKeesara:garden@garden-cluster.jhykp3h.mongodb.net/garden-area?retryWrites=true&w=majority';

  mongoose.connect(connectionString);
}

@Route('garden')
export class GardenController extends Controller {
  /**
   * Retrieves all gardens across all towns
   * @returns garden
   */
  @Get()
  public async getAllGardens() {
    connectToGardenDB();
    const gardens = gardenDao.findGardens();
    return gardens;
  }

  /**
   * Retrieves a given garden by ID
   * @returns garden
   */
  @Get('{gardenId}')
  public async getGarden(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const garden = await gardenDao.findGardenById(gardenId);
    return garden;
  }

  /**
   * Retrieves all plants in the provided garden
   * @returns plants
   */
  @Get('{gardenId}/plants')
  public async getAllPlantsByGarden(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const plants = await plantDao.findPlants();
    return plants.filter(plant => plant.gardenId.toHexString() === gardenId);
  }

  /**
   * Retrieves the plant for a given plant ID
   * @param plantId
   */
  @Get('/plants/{plantId}')
  public async getPlantByGarden(
    @Path()
    plantId: PlantId,
  ) {
    connectToGardenDB();
    const plant = await plantDao.findPlantById(plantId);
    return plant;
  }

  /**
   * Retrieves all garden plots for a given garden
   * @param plotId
   */
  @Get('{gardenId}/plots')
  public async getAllPlots(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const plots = await gardenPlotDao.findGardenPlots();
    return plots.filter(plot => plot.gardenId.toHexString() === gardenId);
  }

  /**
   * Retrieves the garden plot for a given plot ID
   * @param plotId
   */
  @Get('/plot/{plotId}')
  public async getPlot(
    @Path()
    plotId: PlantId,
  ) {
    connectToGardenDB();
    const plot = await gardenPlotDao.findGardenPlotById(plotId);
    return plot;
  }
}
export default GardenController;
