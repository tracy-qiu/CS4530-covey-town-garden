import { Controller, Get, Path, Route, Post, Body, Delete } from 'tsoa';
import mongoose from 'mongoose';
import { PlantId } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
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
   * Retrieves a given garden by town ID
   * @returns garden
   */
  @Get('{townId}')
  public async getGarden(
    @Path()
    townId: string,
  ) {
    connectToGardenDB();
    const gardens = await gardenDao.findGardens();
    return gardens.find(garden => garden.townId.toHexString() === townId);
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
  public async addPlant(
    @Body() requestBody: { gardenId: string; gardenPlotId: string; name: string; species: string },
  ) {
    try {
      const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenId);
      const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(
        requestBody.gardenPlotId,
      );
      const speciesObject = mongoose.Types.ObjectId.createFromHexString(requestBody.species);
      connectToGardenDB();
      const plant = await plantDao.createPlant({
        gardenId: gardenIdObject,
        gardenPlotId: gardenPlotIdObject,
        name: requestBody.name,
        age: 'SEEDLING',
        lastWatered: new Date(),
        species: speciesObject,
      });
      return plant;
    } catch (error: unknown) {
      console.error('Error creating ObjectId ', error);
      return { error: 'Invalid ObjectId format' };
    }
  }

  /**
   * Create a new plant
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  public addPlot(@Body() requestBody: { gardenId: string; gardenerId: string }) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    const gardenerIdObject = new mongoose.Types.ObjectId(requestBody.gardenerId);
    connectToGardenDB();
    return gardenPlotDao.createGardenPlot({
      gardenId: gardenIdObject,
      bottomLeftPid: null,
      bottomRightPid: null,
      gardenerId: gardenerIdObject,
      topLeftPid: null,
      topRightPid: null,
    });
  }

  // /**
  //  * Create a new plant
  //  * @param requestBody
  //  * @returns the ID of the newly created plant
  //  */
  // @Post()
  // public addGardener(@Body() requestBody: { name: string }) {
  //   return gardenerDao.createGardener({
  //     name: requestBody.name,
  //   });
  // }

  @Delete()
  /**
   * @param requestBody
   *
   */
  public async deletePlant(@Body() requestBody: { plantId: string }) {
    connectToGardenDB();
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    const response = await plantDao.deletePlant(plantIdObject);
    return response;
  }
}
export default GardenController;
