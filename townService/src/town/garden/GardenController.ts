import { Controller, Get, Path, Route, Post, Body } from 'tsoa';
import mongoose from 'mongoose';
import * as db from './GardenManager';
import { PlantId, Plant } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import * as townDao from '../../database/dao/town-dao';

// replace with env variable ( ref docs )

function connectToDB() {
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
    connectToDB();
    const gardens = gardenDao.findGardens();
    return gardens;
  }

  /**
   * Retrieves the garden for a given town ID
   * @returns garden
   */
  @Get('{gardenId}')
  public async getGarden(
    @Path()
    gardenId: string,
  ) {
    connectToDB();
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
    connectToDB();
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
    connectToDB();
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
    connectToDB();
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
    connectToDB();
    const plot = await gardenPlotDao.findGardenPlotById(plotId);
    return plot;
  }

  // /**
  //  * Create a new plant
  //  * @param requestBody
  //  * @returns the ID of the newly created plant
  //  */
  // @Post()
  // public addStudent(@Body() requestBody: { species: string }) {
  //   // TODO make this be the handler for POST /transcripts
  //   return db.addStudent(requestBody.studentName, requestBody.grades);
  // }

  // /**
  //  * Deletes a student's transcript
  //  * @param studentID The ID of the student to delete
  //  *
  //  */
  // public deleteStudent(studentID: db.StudentID) {
  //   // TODO make this be the handler for DELETE /transcripts/:ID
  //   db.deleteStudent(studentID);
  // }
}
export default GardenController;
