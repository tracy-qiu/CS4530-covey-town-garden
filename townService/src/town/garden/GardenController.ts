import { Response, Controller, Get, Path, Route, Post, Body, Delete } from 'tsoa';
import mongoose from 'mongoose';
import {
  PlantAge,
  PlantHealthStatus,
  PlantId,
  PlantType,
  PlotPlant,
} from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import { validateTownExists, validateGardenDoesNotExistInTown } from './GardenUtil';
import InvalidParametersError from '../../lib/InvalidParametersError';

@Route('garden')
export class GardenController extends Controller {
  // Garden Collection Endpoints
  /**
   * Retrieves all gardens across all towns
   * @returns garden
   */
  @Get()
  public async getAllGardens() {
    try {
      const gardens = await gardenDao.findGardens();
      return gardens;
    } catch (error: unknown) {
      return { error: `Error getting all gardens: ${error}` };
    }
  }

  @Post('{townId}/garden')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async createGarden(@Path() townId: string) {
    try {
      await validateTownExists(townId);
      await validateGardenDoesNotExistInTown(townId);
      const garden = await gardenDao.createGarden({
        gardenPlots: [],
        townId,
      });
      return garden;
    } catch (error: unknown) {
      return Error(`Error creating new garden: ${error}`);
    }
  }

  /**
   * Retrieves a given garden by garden ID
   * @returns garden
   */
  @Get('{gardenId}')
  public async getGardenById(
    @Path()
    gardenId: string,
  ) {
    const gardenIdObject = new mongoose.Types.ObjectId(gardenId);
    try {
      const garden = await gardenDao.findGardenById(gardenIdObject);
      return garden;
    } catch (error: unknown) {
      return { error: `Error getting garden by id: ${error}` };
    }
  }

  /**
   * Retrieves a given garden by town ID
   * @returns garden
   */
  @Get('{townId}/garden')
  public async getGardenByTownId(
    @Path()
    townId: string,
  ) {
    try {
      const garden = await gardenDao.findGardenByTownId(townId);
      return garden;
    } catch (error: unknown) {
      return { error: `Error finding garden by town id: ${error}` };
    }
  }

  /**
   * Update a garden by adding a new plot
   * @param requestBody
   * @returns response
   */
  @Post('/update')
  public async updateGarden(@Body() requestBody: { gardenId: string; plotId: string }) {
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenId);
    try {
      const response = await gardenDao.updateGarden(gardenIdObject, requestBody.plotId);
      return response;
    } catch (error: unknown) {
      return { error: `Error adding plot to garden: ${error}` };
    }
  }

  /**
   * Deletes a garden by garden Id
   * @param
   */
  @Delete('/{gardenId}')
  public async deleteGarden(
    @Path()
    gardenId: string,
  ) {
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(gardenId);
    try {
      const garden = await gardenDao.findGardenById(gardenIdObject);
      await gardenDao.deleteGarden(gardenIdObject);
      const gardenPlots = garden?.gardenPlots;
      if (gardenPlots) {
        await Promise.all(
          gardenPlots.map(async (plotId: string) => {
            this._deletePlotHelper(plotId);
          }),
        );
      }
    } catch (error: unknown) {
      return { error: `Error deleting garden: ${error}` };
    }
    return { success: 'Garden successfully deleted.' };
  }

  // Gardener Collection Endpoints

  /**
   * Retrieves all gardeners in a garden
   * @returns garden
   */
  @Get('/{gardenId}/gardeners')
  public async getAllGardenersInGarden(
    @Path()
    gardenId: string,
  ) {
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
      return gardener;
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
    const gardenerIdObject = mongoose.Types.ObjectId.createFromHexString(gardenerId);
    try {
      const response = await gardenerDao.deleteGardener(gardenerIdObject);
      return response;
    } catch (error: unknown) {
      return { error: `Error deleting gardener ${error}` };
    }
  }

  // Plot Collection Endpoints
  /**
   * Retrieves all garden plots for a given garden
   * @param gardenId
   * @returns garden plots
   */
  @Get('{gardenId}/plots')
  public async getAllPlotsInGarden(
    @Path()
    gardenId: string,
  ) {
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
   * @returns garden plot
   */
  @Get('/plots/{gardenPlotId}')
  public async getPlot(
    @Path()
    gardenPlotId: PlantId,
  ) {
    const gardenPlotIdObject = new mongoose.Types.ObjectId(gardenPlotId);
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
   * @returns the new plot
   */
  @Post('/plot')
  public async addPlot(@Body() requestBody: { gardenId: string; gardenerId: string }) {
    const gardenIdObject = new mongoose.Types.ObjectId(requestBody.gardenId);
    const gardenerIdObject = new mongoose.Types.ObjectId(requestBody.gardenerId);
    const plants: PlotPlant[] = Array(4)
      .fill(undefined)
      .map((_, index) => ({
        plotPlantId: `${index}`,
        plantId: null,
      }));
    try {
      const plot = await gardenPlotDao.createGardenPlot({
        gardenId: gardenIdObject,
        gardenerId: gardenerIdObject,
        plants,
      });
      return plot;
    } catch (error: unknown) {
      return { error: `Error adding plot to garden: ${error}` };
    }
  }

  private async _deletePlotHelper(gardenPlotId: string) {
    const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(gardenPlotId);
    const plot = await gardenPlotDao.findGardenPlotById(gardenPlotIdObject);
    // delete the plot
    await gardenPlotDao.deleteGardenPlot(gardenPlotIdObject);

    // delete the plot from the garden
    const gardenIdObject = plot?.gardenId;
    if (gardenIdObject) {
      await gardenDao.deleteGardenPlot(gardenIdObject, gardenPlotId);
    }

    // delete all plants associated to plot
    const plotPlants = plot?.plants
      .map(plant => plant.plantId)
      .filter((plantId: string | null): plantId is string => plantId !== null);
    if (plotPlants) {
      await Promise.all(
        plotPlants.map(async (plantId: string) => {
          await plantDao.deletePlant(new mongoose.Types.ObjectId(plantId));
        }),
      );
    }
  }

  /**
   * Deletes a plot by plot Id
   * @param gardenPlotId
   * @returns response of deleteGardenPlot
   */
  @Delete('/plots/{gardenPlotId}')
  public async deletePlot(
    @Path()
    gardenPlotId: string,
  ) {
    try {
      this._deletePlotHelper(gardenPlotId);
    } catch (error: unknown) {
      return { error: `Error deleting garden plot: ${error}` };
    }
    return { success: 'Plot successfully deleted.' };
  }

  /**
   * Update a garden plot by adding a new plant
   * @param requestBody
   * @returns response of updateGardenPlot
   */
  @Post('/update/plot')
  public async updatePlot(
    @Body() requestBody: { plotId: string; plantId: string; plotLocation: number },
  ) {
    const plotIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plotId);
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    try {
      const response = await gardenPlotDao.updateGardenPlot(
        plotIdObject,
        plantIdObject,
        requestBody.plotLocation,
      );
      return response;
    } catch (error: unknown) {
      return { error: `Error updating plot with new plant: ${error}` };
    }
  }

  // Plant Collection Endpoints
  /**
   * Retrieves all plants in the provided plot
   * @returns plants
   */
  @Get('{plotId}/plants')
  public async getAllPlantsByPlot(
    @Path()
    plotId: string,
  ) {
    const plotIdObject = mongoose.Types.ObjectId.createFromHexString(plotId);
    try {
      const plants = await plantDao.findPlants(plotIdObject);
      return plants;
    } catch (error: unknown) {
      return { error: `Error getting all plants in a plot: ${error}` };
    }
  }

  /**
   * Retrieves the plant for a given plant ID
   * @param plantId
   */
  @Get('/plants/{plantId}')
  public async getPlantById(
    @Path()
    plantId: PlantId,
  ) {
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(plantId);
    try {
      const plant = await plantDao.findPlantById(plantIdObject);
      return plant;
    } catch (error: unknown) {
      return { error: `Error getting plant by id: ${error}` };
    }
  }

  /**
   * Create a new plant
   * @param requestBody
   * @returns the plant object
   */
  @Post('/plant')
  @Response<InvalidParametersError>(400, 'Invalid values specified')
  public async addPlant(
    @Body()
    requestBody: {
      gardenId: string;
      gardenPlotId: string;
      name: string;
      species: PlantType;
    },
  ) {
    const gardenIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.gardenId);
    const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(
      requestBody.gardenPlotId,
    );
    if (!['Carrot', 'Rose', 'Blueberry'].includes(requestBody.species)) {
      throw new Error('Invalid value for species.');
    }
    try {
      const plant = await plantDao.createPlant({
        gardenId: gardenIdObject,
        gardenPlotId: gardenPlotIdObject,
        name: requestBody.name,
        age: 'Seedling',
        status: 'Healthy',
        lastWatered: new Date(),
        species: requestBody.species,
      });
      return plant;
    } catch (error: unknown) {
      return { error: `Error creating new plant: ${error}` };
    }
  }

  /**
   * Deletes plant of given plantId
   * @param requestBody
   *
   */
  @Delete('/plant/delete')
  public async deletePlant(
    @Body()
    requestBody: {
      plantId: string;
      gardenPlotId: string;
    },
  ) {
    connectToGardenDB();
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    const gardenPlotIdObject = mongoose.Types.ObjectId.createFromHexString(
      requestBody.gardenPlotId,
    );
    try {
      // delete plant
      await plantDao.deletePlant(plantIdObject);
      // delete plant from
      await gardenPlotDao.deleteGardenPlotPlant(gardenPlotIdObject, plantIdObject);
    } catch (error: unknown) {
      return { error: `Error deleting plant: ${error}` };
    }
    return { success: 'Plant successfully deleted.' };
  }

  /**
   * Update a plant age
   * @param requestBody with plantId and new plantAge
   * @returns response
   */
  @Post('/update/plantAge')
  public async updatePlantAge(@Body() requestBody: { plantId: string; plantAge: PlantAge }) {
    if (!['Seedling', 'Sprout', 'Adult'].includes(requestBody.plantAge)) {
      throw new Error('Invalid value for species.');
    }
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    try {
      const response = await plantDao.updatePlantAge(plantIdObject, requestBody.plantAge);
      return response;
    } catch (error: unknown) {
      return { error: `Error updating plant age: ${error}` };
    }
  }

  /**
   * Update a plant status
   * @param requestBody with plantId and new plantStatus
   * @returns response
   */
  @Post('/update/plantStatus')
  public async updatePlantStatus(
    @Body() requestBody: { plantId: string; plantStatus: PlantHealthStatus },
  ) {
    if (!['Healthy', 'Dehydrated', 'About to Die', 'Dead'].includes(requestBody.plantStatus)) {
      throw new Error('Invalid value for plant health status.');
    }
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    try {
      const response = await plantDao.updatePlantStatus(plantIdObject, requestBody.plantStatus);
      return response;
    } catch (error: unknown) {
      return { error: `Error updating plant status: ${error}` };
    }
  }

  /**
   * Update a plant last watered
   * @param requestBody with plantId
   * @returns response
   */
  @Post('/update/plantLastWatered')
  public async updatePlantLastWatered(@Body() requestBody: { plantId: string }) {
    const plantIdObject = mongoose.Types.ObjectId.createFromHexString(requestBody.plantId);
    try {
      const response = await plantDao.updatePlantLastWatered(plantIdObject);
      return response;
    } catch (error: unknown) {
      return { error: `Error updating plant last watered: ${error}` };
    }
  }
}
export default GardenController;
