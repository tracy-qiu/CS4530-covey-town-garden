import { Controller, Get, Path, Route } from 'tsoa';
import * as db from './GardenManager';
import { PlantId } from '../../types/CoveyTownSocket';

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
