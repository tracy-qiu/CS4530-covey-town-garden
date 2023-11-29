// import axios from 'axios';
import axios from 'axios';
import { gardenApiClient, parameterizedGardenRoutes } from './garden-client';
import { AppAxiosInstance } from './garden-client';

const BASE_URL = 'http://localhost';

const apiGetSpy = jest.spyOn(AppAxiosInstance, 'get');
const apiPostSpy = jest.spyOn(AppAxiosInstance, 'post');
const apiDeleteSpy = jest.spyOn(AppAxiosInstance, 'delete');
const apiUpdateSpy = jest.spyOn(AppAxiosInstance, 'put');

describe('Garden API Client Tests', () => {
  describe('Plant tests', () => {
    it('getPlant returns expected plant', async () => {
      const mockResponse = {
        data: {
          _id: '655e822fc8e5a1922fefad32',
          gardenId: '65410a8a51272d8bd84fa95e',
          gardenPlotId: '655f63f32af8827337046952',
          name: 'Dummy Plant 1',
          species: 'Carrot',
          age: 'Seedling',
          lastWatered: new Date('2023-11-22T22:35:27.437+00:00'),
        },
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlant('655e822fc8e5a1922fefad32');
      expect(result).toEqual(mockResponse.data);
    });
    it('getPlantsByGarden returns expected plants', async () => {
      const mockResponse = {
        data: [
          {
            _id: '655e822fc8e5a1922fefad32',
            gardenId: '65410a8a51272d8bd84fa95e',
            gardenPlotId: '655f63f32af8827337046952',
            name: 'Dummy Plant 1',
            species: 'Carrot',
            age: 'Seedling',
            lastWatered: new Date('2023-11-22T22:35:27.437+00:00'),
          },
          {
            _id: '655f652dc2d6cf7becc77bd3',
            gardenId: '65410a8a51272d8bd84fa95e',
            gardenPlotId: '655f63f32af8827337046952',
            name: 'Dummy Plant 1',
            species: 'Rose',
            age: 'Adult',
            lastWatered: new Date('2023-11-22T22:35:27.437+00:00'),
          },
        ],
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlantsByGarden('65410a8a51272d8bd84fa95e');
      expect(result).toEqual(mockResponse.data);
    });
    it('getPlantsByPlot returns expected plants', async () => {
      const mockResponse = {
        data: [
          {
            _id: '655e822fc8e5a1922fefad32',
            gardenId: '65410a8a51272d8bd84fa95e',
            gardenPlotId: '655f63f32af8827337046952',
            name: 'Dummy Plant 1',
            species: 'Carrot',
            age: 'Seedling',
            lastWatered: new Date('2023-11-22T22:35:27.437+00:00'),
          },
          {
            _id: '655f652dc2d6cf7becc77bd3',
            gardenId: '65410a8a51272d8bd84fa95e',
            gardenPlotId: '655f63f32af8827337046952',
            name: 'Dummy Plant 1',
            species: 'Rose',
            age: 'Adult',
            lastWatered: new Date('2023-11-22T22:35:27.437+00:00'),
          },
        ],
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlantsByPlot('655f63f32af8827337046952');
      expect(result).toEqual(mockResponse.data);
    });
    it('deletePlant removes expected plant', async () => {
      const mockResponse = {
        data: [
          {
            acknowledged: true,
            deletedCount: 1,
          },
        ],
      };

      apiDeleteSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.deletePlant('655f63f32af8827337046952');
      expect(result).toEqual(mockResponse.data);
    });
    it('createPlant adds expected plant', async () => {
      const mockResponse = {
        data: {
          gardenId: '655f63762af8827337046941',
          gardenPlotId: '655f63f32af8827337046952',
          name: 'Dummy',
          age: 'Seedling',
          lastWatered: '2023-11-24T01:56:59.161Z',
          species: 'Carrot',
          _id: '656002ebc7b0a29f6dac3350',
          __v: 0,
        },
      };

      apiPostSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.createPlant({
        species: 'Carrot',
        name: 'Dummy',
        gardenPlotId: '655f63f32af8827337046952',
        gardenId: '655f63762af8827337046941',
      });
      expect(result).toEqual(mockResponse.data._id);
    });
  });
  describe('Plot tests', () => {
    it('getPlot returns expected plot', async () => {
      const mockResponse = {
        data: {
          _id: '65496305b9887dfeb8cfbaa9',
          bottomLeftPlantId: '654968a776fde18fb885274a',
          bottomRightPlantId: '6549690076fde18fb885274c',
          gardenId: '654887f951272d8bd84fa959',
          gardenerId: '65488a8a51272d8bd84fa95e',
          topLeftPlantId: '65488b2251272d8bd84fa95f',
          topRightPlantId: null,
        },
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlot('65496305b9887dfeb8cfbaa9');
      expect(result).toEqual(mockResponse.data);
    });
    it('getPlotsByGarden returns expected plots', async () => {
      const mockResponse = {
        data: [
          {
            _id: '65496305b9887dfeb8cfbaa9',
            bottomLeftPlantId: '654968a776fde18fb885274a',
            bottomRightPlantId: '6549690076fde18fb885274c',
            gardenId: '654887f951272d8bd84fa959',
            gardenerId: '65488a8a51272d8bd84fa95e',
            topLeftPlantId: '65488b2251272d8bd84fa95f',
            topRightPlantId: null,
          },
          {
            _id: '655f63f32af8827337046952',
            bottomLeftPlantId: null,
            bottomRightPlantId: null,
            gardenId: '654887f951272d8bd84fa959',
            gardenerId: '65488a8a51272d8bd84fa95e',
            topLeftPlantId: '65488b2251272d8bd84fa95f',
            topRightPlantId: null,
          },
        ],
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlotsByGarden('654887f951272d8bd84fa959');
      expect(result).toEqual(mockResponse.data);
    });
    it('getPlotsByGardener returns expected plots', async () => {
      const mockResponse = {
        data: [
          {
            _id: '65496305b9887dfeb8cfbaa9',
            bottomLeftPlantId: '654968a776fde18fb885274a',
            bottomRightPlantId: '6549690076fde18fb885274c',
            gardenId: '654887f951272d8bd84fa959',
            gardenerId: '65488a8a51272d8bd84fa95e',
            topLeftPlantId: '65488b2251272d8bd84fa95f',
            topRightPlantId: null,
          },
          {
            _id: '655f63f32af8827337046952',
            bottomLeftPlantId: null,
            bottomRightPlantId: null,
            gardenId: '654887f951272d8bd84fa959',
            gardenerId: '65488a8a51272d8bd84fa95e',
            topLeftPlantId: '65488b2251272d8bd84fa95f',
            topRightPlantId: null,
          },
        ],
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getPlotsByGardener('65488a8a51272d8bd84fa95e');
      expect(result).toEqual(mockResponse.data);
    });
    it('deletePlot removes expected plot', async () => {
      const mockResponse = {
        data: {
          acknowledged: true,
          deletedCount: 1,
        },
      };

      apiDeleteSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.deletePlot('65488a8a51272d8bd84fa95e');
      expect(result).toEqual(mockResponse.data);
    });
    it('createPlot adds expected plot', async () => {
      const mockResponse = {
        data: {
          gardenId: '655d213fe1575ca615961d28',
          gardenerId: '65488a8a51272d8bd84fa95e',
          plants: [
            {
              plotPlantId: '0',
              _id: '656712a5a6c61426b82aeeed',
            },
            {
              plotPlantId: '1',
              _id: '656712a5a6c61426b82aeeee',
            },
            {
              plotPlantId: '2',
              _id: '656712a5a6c61426b82aeeef',
            },
            {
              plotPlantId: '3',
              _id: '656712a5a6c61426b82aeef0',
            },
          ],
          _id: '656712a5a6c61426b82aeeec',
          __v: 0,
        },
      };

      apiPostSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.createPlot({
        gardenId: '655d213fe1575ca615961d28',
        gardenerId: '65488a8a51272d8bd84fa95e',
      });
      expect(result).toEqual(mockResponse.data._id);
    });
  });
  describe('Garden tests', () => {
    it('getGarden returns expected garden given a town id', async () => {
      const mockResponse = {
        data: {
          _id: '655aa3552e6f4f406e76a7e0',
          townId: '655a9d90b690366746edae51',
          gardenPlots: ['655aa3552e6f4f406e76a111', '655aa3552e6f4f406e76a222'],
          __v: 0,
        },
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getGarden('655a9d90b690366746edae51');
      expect(result).toEqual(mockResponse.data);
    });
    it('deleteGarden removes expected garden', async () => {
      const mockResponse = {
        data: [
          {
            acknowledged: true,
            deletedCount: 1,
          },
        ],
      };

      apiDeleteSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.deleteGarden('655a9d90b690366746edae51');
      expect(result).toEqual(mockResponse.data);
    });
    it('createGarden adds expected garden', async () => {
      const mockResponse = {
        data: {
          townId: '655d6195e1575ca615961d32',
          gardenPlots: [],
          _id: '6563aa104430c41d538907f3',
          __v: 0,
        },
      };

      apiPostSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.createGarden('655d6195e1575ca615961d32');
      expect(result).toEqual(mockResponse.data);
    });
  });
  describe('Gardener tests', () => {
    it('getGardener returns expected gardener', async () => {
      const mockResponse = {
        data: {
          _id: '65488a8a51272d8bd84fa95e',
          name: 'Surabhi',
          gardenID: '655d213fe1575ca615961d28',
        },
      };

      apiGetSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.getGardener('65488a8a51272d8bd84fa95e');
      expect(result).toEqual(mockResponse.data);
    });
    it('deleteGardener removes expected gardener', async () => {
      const mockResponse = {
        data: [
          {
            acknowledged: true,
            deletedCount: 1,
          },
        ],
      };

      apiDeleteSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.deleteGardener('65488a8a51272d8bd84fa95e');
      expect(result).toEqual(mockResponse.data);
    });
    it('createGardener adds expected gardener', async () => {
      const mockResponse = {
        data: {
          gardenId: '655d213fe1575ca615961d28',
          name: 'Bob',
          _id: '6563ab154430c41d538907f6',
          __v: 0,
        },
      };

      apiPostSpy.mockResolvedValueOnce(mockResponse);
      const result = await gardenApiClient.createGardener({
        gardenId: '655d213fe1575ca615961d28',
        name: 'Bob',
      });
      expect(result).toEqual(mockResponse.data._id);
    });
  });
});
