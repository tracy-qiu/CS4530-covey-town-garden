import { Body, Controller, Get, Path, Post, Query, Response, Route, Tags } from 'tsoa';
import * as db from './GardenManager';
import { PlantId, PlantType, Plant, PlantHealthStatus } from './plants';

@Route('garden')
export class GardenController extends Controller {
  @Get()
  public getAll() {
    return db.getAll();
  }

  /**
   * Retrieves the plant for a given plant ID
   * @param plantId
   */
  @Get('{plantId}')
  public getPlant(
    @Path()
    plantId: PlantId,
  ) {
    if (db.getPlant(plantId) === undefined) {
      throw new Error('Invalid values specified');
    }
    return db.getPlant(plantId);
  }
}
export default GardenController;
