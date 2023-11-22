import { Controller, Get, Path, Route, Post, Body, Delete } from 'tsoa';
import mongoose from 'mongoose';
import { PlantId } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as plotDao from '../../database/dao/gardenPlot-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
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

  /**
   * Create a new plant
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post()
  public addPlant(
    @Body() requestBody: { gardenId: string; gardenPlotId: string; name: string; species: string },
  ) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    const gardenPlotIdObject = new mongoose.Types.ObjectId(requestBody.gardenPlotId);
    const speciesObject = new mongoose.Types.ObjectId(requestBody.species);
    return plantDao.createPlant({
      gardenId: gardenIdObject,
      gardenPlotId: gardenPlotIdObject,
      name: requestBody.name,
      age: 'SEEDLING',
      lastWatered: new Date(),
      species: speciesObject,
    });
  }

  /**
   * Create a new plant
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post()
  public addPlot(@Body() requestBody: { gardenId: string, gardenerId:  }) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    return plotDao.createGardenPlot({
      gardenId: gardenIdObject,
      bottomLeftPlantId: null,
      bottomRightPlantId: null,
      gardenerId: null,
      topLeftPlantId: null,
      topRightPlantId: null,
    });
  }

  /**
   * Create a new plant
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post()
  public addGardener(@Body() requestBody: { name: string }) {
    return gardenerDao.createGardener({
      name: requestBody.name,
    });
  }

  @Delete()
  /**
   * @param requestBody
   *
   */
  public deletePlant(@Body() requestBody: { plantId: number }) {
    return plantDao.deletePlant(requestBody.plantId);
  }
}
export default GardenController;
