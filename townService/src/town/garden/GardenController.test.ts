import { GardenController } from './GardenController';
import * as gardenDao from '../../database/dao/garden-dao'; // Update the path accordingly

jest.mock('../../database/dao/garden-dao'); // Mock the gardenDao module

describe('GardenController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllGardens', () => {
    it('should return gardens on success', async () => {
      // Mock the implementation of findGardens
      const mockGardens = [{ name: 'Garden 1' }];
      (gardenDao.findGardens as jest.Mock).mockResolvedValue(mockGardens);

      const controller = new GardenController();

      // Act
      const result = await controller.getAllGardens();

      // Assert
      expect(result).toEqual(mockGardens);
    });

    it('should return an error on failure', async () => {
      // Mock the implementation of findGardens to throw an error
      (gardenDao.findGardens as jest.Mock).mockRejectedValue(new Error('Database error'));

      const controller = new GardenController();

      // Act
      const result = await controller.getAllGardens();

      // Assert
      expect(result).toEqual({ error: 'Error getting all gardens: Error: Database error' });
    });
  });
});
