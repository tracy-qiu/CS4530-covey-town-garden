import axios, { AxiosInstance } from 'axios';
import {
  Garden,
  GardenPlot,
  Gardener,
  PlantType,
  Plant,
  PlantAge,
  PlantHealthStatus,
} from '../types/CoveyTownSocket';

export interface GardenClient {
  readonly getGardenByTown: (townId: string) => Promise<Garden>;
  readonly getGarden: (gardenId: string) => Promise<Garden>;
  readonly getPlant: (plantId: string) => Promise<Plant>;
  readonly getPlot: (plotId: string) => Promise<GardenPlot>;
  readonly getPlantsByGarden: (gardenId: string) => Promise<Plant[]>;
  readonly getPlantsByPlot: (plotId: string) => Promise<Plant[]>;
  readonly getPlotsByGarden: (gardenId: string) => Promise<GardenPlot[]>;
  readonly getGardenersByGarden: (gardenId: string) => Promise<Gardener[]>;
  readonly getPlotsByGardener: (gardenerId: string) => Promise<GardenPlot[]>;
  readonly getGardener: (gardenerId: string) => Promise<Gardener>;
  readonly deleteGarden: (gardenId: string) => Promise<void>;
  readonly deletePlant: (plantId: string) => Promise<void>;
  readonly deletePlot: (plotId: string) => Promise<void>;
  readonly deleteGardener: (gardenerId: string) => Promise<void>;
  readonly createPlant: (requestBody: {
    gardenId: string;
    gardenPlotId: string;
    name: string;
    species: PlantType;
  }) => Promise<string>;
  readonly createPlot: (requestBody: { gardenId: string; gardenerId: string }) => Promise<string>;
  readonly createGarden: (townId: string) => Promise<string>;
  readonly createGardener: (requestBody: { gardenId: string; name: string }) => Promise<string>;
  readonly createTown: (requestBody: { townId: string; adminId?: string }) => Promise<string>;
  readonly updatePlantAge: (requestBody: {
    plantId: string;
    plantAge: PlantAge;
  }) => Promise<string>;
  readonly updatePlantWatered: (requestBody: { plantId: string }) => Promise<string>;
  readonly updatePlot: (requestBody: {
    plotId: string;
    plantId: string;
    plotLocation: number;
  }) => Promise<string>;
  readonly updatePlantStatus: (requestBody: {
    plantId: string;
    plantStatus: PlantHealthStatus;
  }) => Promise<string>;
  readonly updateGardener: (requestBody: { gardenId: string; name: string }) => Promise<string>;
  readonly updateGarden: (requestBody: { gardenId: string; plotId: string }) => Promise<string>;
}

export const parameterizedGardenRoutes = {
  CREATE_GARDEN: (townId: string): string => `/garden/${townId}/garden`,
  GET_GARDEN_BY_TOWN: (townId: string): string => `/garden/${townId}/garden`,
  GET_GARDEN: (gardenId: string): string => `/garden/${gardenId}`,
  GET_PLANT: (plantId: string): string => `/garden/plants/${plantId}`,
  GET_PLOT: (plotId: string): string => `/garden/plot/${plotId}`,
  GET_PLANTS_BY_GARDEN: (gardenId: string): string => `/garden/${gardenId}/plants/`,
  GET_PLANTS_BY_PLOT: (plotId: string): string => `/garden/${plotId}/plants/`,
  GET_PLOTS_BY_GARDEN: (gardenId: string): string => `/garden/${gardenId}/plots`,
  GET_PLOTS_BY_GARDENER: (gardenerId: string): string => `/garden/${gardenerId}/plots`,
  GET_GARDENERS_BY_GARDEN: (gardenId: string): string => `/garden/${gardenId}/gardeners`,
  GET_GARDENER: (gardenerId: string): string => `/garden/gardeners/${gardenerId}`,

  DELETE_GARDEN: (gardenId: string): string => `/garden/gardens/${gardenId}`,
  DELETE_PLANT: (plantId: string): string => `/garden/plants/${plantId}`,
  DELETE_PLOT: (plotId: string): string => `/garden/plots/${plotId}`,
  DELETE_GARDENER: (gardenerId: string): string => `/garden/gardeners/${gardenerId}`,
};

export enum GardenRoutes {
  GET_TOWNS = '/garden/towns',
  GET_GARDENS = '/garden',

  CREATE_PLANT = '/garden/plant',
  CREATE_PLOT = '/garden/plot',
  CREATE_GARDENER = '/garden/gardener',
  CREATE_TOWN = '/garden/town',

  UPDATE_PLANT_WATERED = '/garden/update/plantLastWatered',
  UPDATE_PLANT_STATUS = '/garden/update/plantStatus',
  UPDATE_PLANT_AGE = '/garden/update/plantAge',
  UPDATE_PLOT = '/garden/update/plot',
  UPDATE_GARDENER = '/garden/gardener',
  UPDATE_GARDEN = '/garden/update',
}

export const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TOWNS_SERVICE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Given a HexString town ID, returns the associated garden
 * @param townId: string
 * @returns garden object
 */
const getGardenByTown = (townId: string): Promise<Garden> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_GARDEN_BY_TOWN(townId)).then(
    res => res.data[0],
  );

/**
 * Given a HexString garden ID, returns the associated garden
 * @param gardenId: string
 * @returns garden object
 */
const getGarden = (gardenId: string): Promise<Garden> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_GARDEN(gardenId)).then(res => res.data);

/**
 * Given a HexString plant id, returns a plant
 * @param plantId: string
 * @returns Plant object
 */
const getPlant = (plantId: string): Promise<Plant> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLANT(plantId)).then(res => res.data);

/**
 * Given a HexString gardener id, return a gardener
 * @param gardenerId: string
 * @returns Gardener object
 */
const getGardener = (gardenerId: string): Promise<Gardener> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_GARDENER(gardenerId)).then(res => res.data);

/**
 * Given a HexString plot id, returns a plot
 * @param plotId: string
 * @returns GardenPlot object
 */
const getPlot = (plotId: string): Promise<GardenPlot> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLOT(plotId)).then(res => res.data);

/**
 * Given a HexString garden id, returns all plants in the garden
 * NOTE: This method may not be needed
 * @param gardenId Garden from which to retreive plants
 * @returns Plant[]
 */
const getPlantsByGarden = (gardenId: string): Promise<Plant[]> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLANTS_BY_GARDEN(gardenId)).then(
    res => res.data,
  );

/**
 * Given a HexString plot id, returns all plants in the plot
 * @param plotId Plot from which to retreive plants
 * @returns Plant[]
 */
const getPlantsByPlot = (plotId: string): Promise<Plant[]> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLANTS_BY_PLOT(plotId)).then(res => res.data);

/**
 * Given a HexString garden id, returns all plots in the garden
 * @param gardenId Garden from which to retreive plots
 * @returns GardenPlot[]
 */
const getPlotsByGarden = (gardenId: string): Promise<GardenPlot[]> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLOTS_BY_GARDEN(gardenId)).then(
    res => res.data,
  );

/**
 * Given a HexString gardener id, returns the plot of the given gardener
 * @param gardenerId Gardener whose plot we retreive
 * @returns GardenPlot
 */
const getPlotsByGardener = (gardenerId: string): Promise<GardenPlot[]> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_PLOTS_BY_GARDENER(gardenerId)).then(
    res => res.data,
  );

/**
 * Given a HexString garden id, returns the gardeners in that garden
 * @param gardenId Gardener whose plot we retreive
 * @returns Gardener[]
 */
const getGardenersByGarden = (gardenId: string): Promise<Gardener[]> =>
  AppAxiosInstance.get(parameterizedGardenRoutes.GET_GARDENERS_BY_GARDEN(gardenId)).then(
    res => res.data,
  );

//DELETE ENDPOINTS
/**
 * Delete garden at given ID. Also deletes all plants, plots, and gardeners in the garden
 * @param gardenId HexString ID of garden to delete
 */
const deleteGarden = (gardenId: string): Promise<void> =>
  AppAxiosInstance.delete(parameterizedGardenRoutes.DELETE_GARDEN(gardenId)).then(res => res.data);

/**
 * Delete plant at given ID
 * @param plantId HexString ID of plant to delete
 */
const deletePlant = (plantId: string): Promise<void> =>
  AppAxiosInstance.delete(parameterizedGardenRoutes.DELETE_PLANT(plantId)).then(res => res.data);

/**
 * Delete plot at given ID. Also deletes all plants in the given plot
 * @param plotId HexString ID of plot to delete
 */
const deletePlot = (plotId: string): Promise<void> =>
  AppAxiosInstance.delete(parameterizedGardenRoutes.DELETE_PLOT(plotId)).then(res => res.data);

/**
 * Delete gardener at given ID. Also deletes gardener plot and all plants in plot
 * @param gardenerId HexString ID of gardener to delete
 */
const deleteGardener = (gardenerId: string): Promise<void> =>
  AppAxiosInstance.delete(parameterizedGardenRoutes.DELETE_GARDENER(gardenerId)).then(
    res => res.data,
  );

// POST
/**
 * Create plant given requestBody
 * @param requestBody { gardenId (string), gardenPlotId (string), name (string), species (PlantType)
 * @returns PlantId HexString
 */
const createPlant = (requestBody: {
  gardenId: string;
  gardenPlotId: string;
  name: string;
  species: PlantType;
}): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.CREATE_PLANT, requestBody).then(res => res.data._id);
};

/**
 * Create plot given requestBody
 * @param requestBody { gardenId (string), gardenerId (string)
 * @returns PlotId HexString
 */
const createPlot = (requestBody: { gardenId: string; gardenerId: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.CREATE_PLOT, requestBody).then(res => res.data._id);
};

/**
 * Create garden given requestBody
 * @param requestBody { townId (string) }
 * @returns GardenId HexString
 */
const createGarden = (townId: string): Promise<string> => {
  return AppAxiosInstance.post(parameterizedGardenRoutes.CREATE_GARDEN(townId)).then(
    res => res.data,
  );
};

/**
 * Create gardener given requestBody
 * @param requestBody { gardenId (string), name (string) }
 * @returns PlantId HexString
 */
const createGardener = (requestBody: { name: string; gardenId: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.CREATE_GARDENER, requestBody).then(res => res.data._id);
};

/**
 * Create town given TownId and admin id (optional)
 * @param requestBody { townId (string), adminId? (string) }
 * @returns TownId HexString
 */
const createTown = (requestBody: { townId: string; adminId?: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.CREATE_TOWN, requestBody).then(res => res.data);
};

// UPDATE

/**
 * Update the age of a plant
 * @param requestBody { plantId (string), age (string) }
 * @returns PlantId HexString
 */
const updatePlantAge = (requestBody: { plantId: string; plantAge: PlantAge }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_PLANT_AGE, requestBody).then(res => res.data);
};

/**
 * Water a plant by updating its 'lastWatered' field
 * @param requestBody { plantId (string), plantStatus (string) }
 * @returns PlantId HexString
 */
const updatePlantStatus = (requestBody: {
  plantId: string;
  plantStatus: PlantHealthStatus;
}): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_PLANT_STATUS, requestBody).then(res => res.data);
};

/**
 * Water a plant by updating its 'lastWatered' field
 * @param requestBody { plantId (string) }
 * @returns PlantId HexString
 */
const updatePlantWatered = (requestBody: { plantId: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_PLANT_WATERED, requestBody).then(
    res => res.data,
  );
};

/**
 * Add a plant to a garden plot
 * @param requestBody { gardenId (string), plotNumber (string), plantId (string) }
 * @returns PlotId HexString
 */
const updatePlot = (requestBody: {
  plotId: string;
  plantId: string;
  plotLocation: number;
}): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_PLOT, requestBody).then(res => res.data);
};

/**
 * Update a gardener in a garden
 * @param requestBody { gardenId (string), name (string) }
 * @returns GardenerId HexString
 */
const updateGardener = (requestBody: { gardenId: string; name: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_GARDENER, requestBody).then(res => res.data);
};

/**
 * Update a garden
 * @param requestBody { gardenId (string) }
 * @returns GardenerId HexString
 */
const updateGarden = (requestBody: { gardenId: string; plotId: string }): Promise<string> => {
  return AppAxiosInstance.post(GardenRoutes.UPDATE_GARDEN, requestBody).then(res => res.data);
};

export const gardenApiClient: GardenClient = Object.freeze({
  getGardenByTown,
  getGarden,
  getPlant,
  getPlot,
  getGardener,
  getPlantsByGarden,
  getPlantsByPlot,
  getPlotsByGarden,
  getPlotsByGardener,
  getGardenersByGarden,
  deleteGarden,
  deleteGardener,
  deletePlant,
  deletePlot,
  createGarden,
  createGardener,
  createPlant,
  createPlot,
  createTown,
  updateGarden,
  updateGardener,
  updatePlot,
  updatePlantStatus,
  updatePlantAge,
  updatePlantWatered,
});
