import { Controller, Get, Path, Route, Post, Body } from 'tsoa';
import mongoose from 'mongoose';
import * as db from './GardenManager';
import { PlantId } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import * as townDao from '../../database/dao/town-dao';

// replace with env variable ( ref docs )
const CONNECTION_STRING =
  'mongodb+srv://surabhiKeesara:garden@garden-cluster.jhykp3h.mongodb.net/garden-area?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_STRING);

@Route('garden')
export class GardenController extends Controller {
  @Get()
  public async getAll() {
    const plants = await plantDao.findPlants();
    return JSON.stringify(plants);
  }

  /**
   * Retrieves the plant for a given plant ID
   * @param plantId
   */
  @Get('{plantId}')
  public async getPlant(
    @Path()
    plantId: PlantId,
  ) {
    const plant = await plantDao.findPlantById(plantId);
    return plant;
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
