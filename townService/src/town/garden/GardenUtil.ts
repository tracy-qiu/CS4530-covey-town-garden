import * as gardenDao from '../../database/dao/garden-dao';
import * as townDao from '../../database/dao/town-dao';
import InvalidParametersError from '../../lib/InvalidParametersError';

export async function validateTownExists(townId: string) {
  const towns = await townDao.findTownById(townId);
  if (towns === null) {
    throw new InvalidParametersError('Town does not exist');
  }
}

export async function validateGardenDoesNotExistInTown(townId: string) {
  const existingGardens = await gardenDao.findGardens();
  const matchingGardens = existingGardens.filter(garden => garden.townId.toHexString() === townId);
  if (matchingGardens.length !== 0) {
    throw new InvalidParametersError('Town has reached maximum of 1 garden');
  }
}
