import { Controller, Get, Path, Route } from 'tsoa';
import * as db from './GardenManager';
import { PlantId } from '../../types/CoveyTownSocket';
import * as plantDao from '../../database/dao/plant-dao';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import * as townDao from '../../database/dao/town-dao';

@Route('garden')
export class GardenController extends Controller {
  @Get()
  public async getAll() {
    const plants = await plantDao.findPlants();
    return plants;
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
}
export default GardenController;
