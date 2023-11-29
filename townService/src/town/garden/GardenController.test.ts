import { GardenController } from './GardenController';
import { validateTownExists, validateGardenDoesNotExistInTown } from './GardenUtil';
import * as gardenDao from '../../database/dao/garden-dao';
import * as gardenPlotDao from '../../database/dao/gardenPlot-dao';
import * as gardenerDao from '../../database/dao/gardener-dao';
import * as plantDao from '../../database/dao/plant-dao';

jest.mock('../../database/dao/garden-dao');
jest.mock('../../database/dao/gardenPlot-dao');
jest.mock('../../database/dao/gardener-dao');
jest.mock('../../database/dao/plant-dao');

describe('GardenController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllGardens', () => {
    it('should return gardens on success', async () => {
      // Mock the implementation of findGardens
      const mockGardens = [{ name: 'Garden 1' }, { name: 'Garden 2' }];
      (gardenDao.findGardens as jest.Mock).mockResolvedValue(mockGardens);

      const controller = new GardenController();

      const result = await controller.getAllGardens();

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

  describe('getGardenById', () => {
    it('should return garden on success', async () => {
      // Mock the implementation of findGardenById
      const mockGarden = { _id: '65658b4197ab972bebd2c75a', name: 'Garden 1' };
      (gardenDao.findGardenById as jest.Mock).mockResolvedValue(mockGarden);

      const controller = new GardenController();

      const result = await controller.getGardenById('65658b4197ab972bebd2c75a');

      expect(result).toEqual(mockGarden);
    });

    it('should return an error on failure', async () => {
      // Mock the implementation of findGardenById to throw an error
      (gardenDao.findGardenById as jest.Mock).mockRejectedValue(new Error('Database error'));

      const controller = new GardenController();

      // Act
      const result = await controller.getGardenById('65658b4197ab972bebd2c75a');

      // Assert
      expect(result).toEqual({ error: 'Error getting garden by id: Error: Database error' });
    });
  });

  describe('getGardenByTownId', () => {
    it('should return the garden when successful', async () => {
      const mockTownId = '65658b4197ab972bebd2c75a';
      const mockGarden = { name: 'Mock Garden' };

      // Mock the implementation of findGardenByTownId
      (gardenDao.findGardenByTownId as jest.Mock).mockResolvedValue(mockGarden);

      const controller = new GardenController();
      const result = await controller.getGardenByTownId(mockTownId);

      expect(result).toEqual(mockGarden);
      expect(gardenDao.findGardenByTownId).toHaveBeenCalledWith(mockTownId);
    });

    it('should return an error when an exception occurs', async () => {
      const mockTownId = '65658b4197ab972bebd2c75a';
      const mockError = new Error('Database error');

      (gardenDao.findGardenByTownId as jest.Mock).mockRejectedValue(mockError);

      const controller = new GardenController();
      const result = await controller.getGardenByTownId(mockTownId);

      expect(result).toEqual({ error: `Error finding garden by town id: ${mockError}` });
      expect(gardenDao.findGardenByTownId).toHaveBeenCalledWith(mockTownId);
    });
  });

  describe('deleteGarden', () => {
    it('should delete the garden and associated data', async () => {
      const mockGardenId = '65658b4197ab972bebd2c75a';

      const controller = new GardenController();

      (gardenDao.deleteGarden as jest.Mock).mockResolvedValue(undefined);
      (gardenPlotDao.deleteGardenPlotsByGarden as jest.Mock).mockResolvedValue(undefined);
      (gardenerDao.deleteGardenersByGarden as jest.Mock).mockResolvedValue(undefined);
      (plantDao.deletePlantsByGarden as jest.Mock).mockResolvedValue(undefined);

      const result = await controller.deleteGarden(mockGardenId);

      // Assert
      expect(result).toEqual({ success: 'Garden successfully deleted.' });
      expect(gardenDao.deleteGarden).toHaveBeenCalledWith(expect.any(Object));
      expect(gardenPlotDao.deleteGardenPlotsByGarden).toHaveBeenCalledWith(expect.any(Object));
      expect(gardenerDao.deleteGardenersByGarden).toHaveBeenCalledWith(expect.any(Object));
      expect(plantDao.deletePlantsByGarden).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return an error if an exception occurs', async () => {
      const mockGardenId = '65658b4197ab972bebd2c75a';
      const mockError = new Error('Database error');

      const controller = new GardenController();

      // Mock the implementation of deleteGarden to throw an error
      (gardenDao.deleteGarden as jest.Mock).mockRejectedValue(mockError);

      // Act
      const result = await controller.deleteGarden(mockGardenId);

      // Assert
      expect(result).toEqual({ error: `Error deleting garden: ${mockError}` });
      expect(gardenDao.deleteGarden).toHaveBeenCalledWith(expect.any(Object));
      expect(gardenPlotDao.deleteGardenPlotsByGarden).not.toHaveBeenCalled();
      expect(gardenerDao.deleteGardenersByGarden).not.toHaveBeenCalled();
      expect(plantDao.deletePlantsByGarden).not.toHaveBeenCalled();
    });
  });

  // describe('updateGarden', () => {
  //   it('should update the garden with a new plot', async () => {
  //     const mockRequestBody = {
  //       gardenId: '65658b4197ab972bebd2c75a',
  //       plotId: '65658b4197ab972bebd2c75a',
  //     };
  //     const mockGardenIdObject = { mock: '65658b4197ab972bebd2c75a' };
  //     const mockResponse = { success: 'Plot added successfully' };

  //     const controller = new GardenController();

  //     // Mock the implementation of updateGarden
  //     (gardenDao.updateGarden as jest.Mock).mockResolvedValue(mockResponse);

  //     // Act
  //     const result = await controller.updateGarden(mockRequestBody);

  //     // Assert
  //     expect(result).toEqual(mockResponse);
  //     expect(gardenDao.updateGarden).toHaveBeenCalledWith(expect.any(Object), 'mockPlotId');
  //   });

  //   it('should return an error if an exception occurs', async () => {
  //     const mockRequestBody = {
  //       gardenId: '65658b4197ab972bebd2c75a',
  //       plotId: '65658b4197ab972bebd2c75a',
  //     };
  //     const mockGardenIdObject = { mock: '65658b4197ab972bebd2c75a' };
  //     const mockError = new Error('Database error');

  //     const controller = new GardenController();

  //     // Mock the implementation of updateGarden to throw an error
  //     (gardenDao.updateGarden as jest.Mock).mockRejectedValue(mockError);

  //     // Act
  //     const result = await controller.updateGarden(mockRequestBody);

  //     // Assert
  //     expect(result).toEqual({ error: `Error adding plot to garden: ${mockError}` });
  //     expect(gardenDao.updateGarden).toHaveBeenCalledWith(expect.any(Object), 'mockPlotId');
  //   });
  // });

  describe('getAllGardenersInGarden', () => {
    it('should retrieve all gardeners in the garden', async () => {
      const mockGardenId = '65658b4197ab972bebd2c75a';
      const mockGardeners = [{ name: 'Gardener Georgia' }, { name: 'Gardener May' }];

      const controller = new GardenController();

      // Mock the implementation of findGardeners
      (gardenerDao.findGardeners as jest.Mock).mockResolvedValue(mockGardeners);

      const result = await controller.getAllGardenersInGarden(mockGardenId);

      expect(result).toEqual(mockGardeners);
      expect(gardenerDao.findGardeners).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return an error if an exception occurs', async () => {
      const mockGardenId = '65658b4197ab972bebd2c75a';
      const mockError = new Error('Database error');

      const controller = new GardenController();

      // Mock the implementation of findGardeners to throw an error
      (gardenerDao.findGardeners as jest.Mock).mockRejectedValue(mockError);
      const result = await controller.getAllGardenersInGarden(mockGardenId);

      expect(result).toEqual({ error: `Error finding gardeners in garden: ${mockError}` });
      expect(gardenerDao.findGardeners).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('getGardener', () => {
    it('should retrieve a gardener by ID', async () => {
      const mockGardenerId = '65658b4197ab972bebd2c75a';
      const mockGardener = { name: 'Test Gardener' };

      const controller = new GardenController();

      (gardenerDao.findGardenerById as jest.Mock).mockResolvedValue(mockGardener);

      const result = await controller.getGardener(mockGardenerId);
      expect(result).toEqual(mockGardener);
      expect(gardenerDao.findGardenerById).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should return an error if an exception occurs', async () => {
      const mockGardenerId = '65658b4197ab972bebd2c75a';
      const mockError = new Error('Database error');

      const controller = new GardenController();

      // Mock the implementation of findGardenerById to throw an error
      (gardenerDao.findGardenerById as jest.Mock).mockRejectedValue(mockError);

      // Act
      const result = await controller.getGardener(mockGardenerId);

      // Assert
      expect(result).toEqual({ error: `Error finding gardeners by id: ${mockError}` });
      expect(gardenerDao.findGardenerById).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  describe('addGardener', () => {
    it('should create a new gardener', async () => {
      const mockRequestBody = { name: 'New Gardener', gardenId: '65658b4197ab972bebd2c75a' };
      const mockGardener = { name: 'New Gardener', _id: '65658b4197ab972bebd2c75a' };

      const controller = new GardenController();

      // Mock the implementation of createGardener
      (gardenerDao.createGardener as jest.Mock).mockResolvedValue(mockGardener);

      const result = await controller.addGardener(mockRequestBody);

      expect(result).toEqual(mockGardener);
      expect(gardenerDao.createGardener).toHaveBeenCalledWith(
        expect.objectContaining({
          gardenId: expect.any(Object),
          name: mockRequestBody.name,
        }),
      );
    });
  });
});
