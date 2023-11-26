import { Controller, Get, Path, Route, Post, Body, Delete } from 'tsoa';
import mongoose from 'mongoose';
import { PlantId, PlantType } from '../../types/CoveyTownSocket';
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
  // GARDEN COLLECTION

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
  @Get('{gardenId}')
  public async getGardenById(
    @Path()
    gardenId: string,
  ) {
    const gardenIdObject = new mongoose.Types.ObjectId(gardenId);
    connectToGardenDB();
    const garden = await gardenDao.findGardenById(gardenIdObject);
    return garden;
  }

  // /**
  //  * Retrieves a given garden by town ID
  //  * @returns garden
  //  */
  // @Get('{townId}')
  // public async getGardenByTownId(
  //   @Path()
  //   townId: string,
  // ) {
  //   const townIdObject = new mongoose.Types.ObjectId(townId);
  //   connectToGardenDB();
  //   const garden = await gardenDao.findGardenByTownId(townIdObject);
  //   return garden;
  // }

  /**
   * Create a new garden
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post()
  public async addGarden(@Body() requestBody: { townId: string }) {
    const townIdObject = new mongoose.Types.ObjectId(requestBody.townId);
    connectToGardenDB();
    const garden = await gardenDao.createGarden({
      townId: townIdObject,
      gardenPlots: [],
    });
    return garden._id;
  }

  /**
   * Update a garden
   * @param requestBody
   * @returns the ID of the newly created garden
   */
  @Post('/update')
  public async updateGarden(@Body() requestBody: { gardenId: string; plotId: string }) {
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenId);
    // const plotIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plotId);
    connectToGardenDB();
    try {
      const response = await gardenDao.updateGarden(gardenIdObject, requestBody.plotId);
      return response;
    } catch (error: unknown) {
      console.error('Error adding new plot to garden', error);
      return { error: 'Error adding new plot to garden' };
    }
  }

  /**
   * Deletes a garden by garden Id
   *
   */
  @Delete('/gardens/{gardenId}')
  public async deleteGarden(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(gardenId);
    try {
      const response = await gardenDao.deleteGarden(gardenIdObject);
      return response;
    } catch (error: unknown) {
      console.error('Error deleting garden', error);
      return { error: 'Error deleting garden' };
    }
  }

  // GARDENER COLLECTION

  /**
   * Retrieves all gardenerss in a garden
   * @returns garden
   */
  @Get('/{gardenId}/gardeners')
  public async getAllGardenersInGarden(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(gardenId);
    try {
      const gardeners = await gardenerDao.findGardeners(gardenIdObject);
      return gardeners;
    } catch (error: unknown) {
      return { error: `Error finding gardeners in garden: ${error}` };
    }
  }

  /**
   * Retrieves a given garden by town ID
   * @returns garden
   */
  @Get('/gardeners/{gardenerId}')
  public async getGardener(
    @Path()
    gardenerId: string,
  ) {
    const gardenerIdObject = mongoose.Types.ObjectId.createFromHexString(gardenerId);
    connectToGardenDB();
    try {
      const gardener = await gardenerDao.findGardenerById(gardenerIdObject);
      return gardener;
    } catch (error: unknown) {
      return { error: `Error finding gardeners by id: ${error}` };
    }
  }

  /**
   * Create a new gardener
   * @param requestBody
   * @returns the ID of the newly created gardener
   */
  @Post('/gardener')
  public async addGardener(@Body() requestBody: { name: string; gardenId: string }) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    try {
      const gardener = await gardenerDao.createGardener({
        gardenId: gardenIdObject,
        name: requestBody.name,
      });
      return gardener._id;
    } catch (error: unknown) {
      return { error: `Error adding new gardener to garden: ${error}` };
    }
  }

  /**
   * Deletes a gardener by gardener Id
   *
   */
  @Delete('/gardeners/{gardenerId}')
  public async deleteGardener(
    @Path()
    gardenerId: string,
  ) {
    connectToGardenDB();
    const gardenerIdObject = mongoose.Types.ObjectId.createFromHexString(gardenerId);
    try {
      const response = await gardenerDao.deleteGardener(gardenerIdObject);
      return response;
    } catch (error: unknown) {
      return { error: `Error deleting gardener ${error}` };
    }
  }

  // /**
  //  * Update a gardener
  //  * @param requestBody
  //  * @returns the ID of the newly created gardener
  //  */
  // @Post('/gardener/update')
  // public async updateGardener(@Body() requestBody: { name: string; gardenerId: string }) {
  //   const gardenerIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenerId);
  //   connectToGardenDB();
  //   try {
  //     const response = await gardenerDao.updateGardener(gardenerIdObject, requestBody.name);
  //     return response;
  //   } catch (error: unknown) {
  //     console.error('Error adding new plot to garden', error);
  //     return { error: 'Error adding new plot to garden' };
  //   }
  // }

  // PLOT COLLECTION
  /**
   * Retrieves all garden plots for a given garden
   * @param plotId
   */
  @Get('{gardenId}/plots')
  public async getAllPlotsInGarden(
    @Path()
    gardenId: string,
  ) {
    connectToGardenDB();
    const gardenIdObject = new mongoose.Types.ObjectId(gardenId);
    try {
      const plots = await gardenPlotDao.findGardenPlots(gardenIdObject);
      return plots;
    } catch (error: unknown) {
      return { error: `Error adding new gardener to garden: ${error}` };
    }
  }

  /**
   * Retrieves the garden plot for a given plot ID
   * @param plotId
   */
  @Get('/plot/{gardenPlotId}')
  public async getPlot(
    @Path()
    gardenPlotId: PlantId,
  ) {
    const gardenPlotIdObject = new mongoose.Types.ObjectId(gardenPlotId);
    connectToGardenDB();
    try {
      const plot = await gardenPlotDao.findGardenPlotById(gardenPlotIdObject);
      return plot;
    } catch (error: unknown) {
      return { error: `Error adding new gardener to garden: ${error}` };
    }
  }

  /**
   * Create a new plot
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post('/plot')
  public async addPlot(@Body() requestBody: { gardenId: string; gardenerId: string }) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    const gardenerIdObject = new mongoose.Types.ObjectId(requestBody.gardenerId);
    connectToGardenDB();
    const plot = await gardenPlotDao.createGardenPlot({
      gardenId: gardenIdObject,
      bottomLeftPid: null,
      bottomRightPid: null,
      gardenerId: gardenerIdObject,
      topLeftPid: null,
      topRightPid: null,
    });
    return plot._id;
  }

  /**
   * Deletes a plot by plot Id
   *
   */
  @Delete('/plots/{gardenPlotId}')
  public async deletePlot(
    @Path()
    gardenPlotId: string,
  ) {
    connectToGardenDB();
    const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(gardenPlotId);
    try {
      const response = await gardenPlotDao.deleteGardenPlot(gardenPlotIdObject);
      return response;
    } catch (error: unknown) {
      return { error: `Error deleting garden plot: ${error}` };
    }
  }

  // PLANT COLLECTION
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
   * Create a new plant
   * @param requestBody
   * @returns the ID of the newly created plant
   */
  @Post('/plant')
  public async addPlant(
    @Body()
    requestBody: {
      gardenId: string;
      gardenPlotId: string;
      name: string;
      species: PlantType;
    },
  ) {
    try {
      const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenId);
      const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(
        requestBody.gardenPlotId,
      );
      if (!['Carrot', 'Rose', 'Blueberry'].includes(requestBody.species)) {
        throw new Error('Invalid value for species.');
      }
      connectToGardenDB();
      const plant = await plantDao.createPlant({
        gardenId: gardenIdObject,
        gardenPlotId: gardenPlotIdObject,
        name: requestBody.name,
        age: 'Seedling',
        lastWatered: new Date(),
        species: requestBody.species,
      });
      return plant;
    } catch (error: unknown) {
      console.error('Error creating ObjectId ', error);
      return { error: 'Invalid ObjectId format' };
    }
  }

  @Delete('/plants/{plantId}')
  /**
   * @param requestBody
   *
   */
  public async deletePlant(
    @Path()
    plantId: string,
  ) {
    connectToGardenDB();
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(plantId);
    const response = await plantDao.deletePlant(plantIdObject);
    return response;
  }
}
export default GardenController;
