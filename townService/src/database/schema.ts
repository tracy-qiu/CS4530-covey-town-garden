import mongoose, { Document, Types, InferSchemaType } from 'mongoose';
import { PlantAge, PlantHealthStatus, PlantType, PlotPlant } from '../types/CoveyTownSocket';

// Towns
const townSchema = new mongoose.Schema(
  {
    townId: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, required: true }, // would reference gardeners table? or new admin table? // depends on user definitions
  },
  { collection: 'towns' },
);

export type TownDB = InferSchemaType<typeof townSchema>;

export const townModel = mongoose.model('TownModel', townSchema);

// Gardens
const gardenSchema = new mongoose.Schema(
  {
    townId: { type: String, ref: 'townSchema', required: true },
    gardenPlots: [{ type: String }],
  },
  { collection: 'gardens' },
);

export type GardenDB = InferSchemaType<typeof gardenSchema>;

export const gardenModel = mongoose.model('GardenModel', gardenSchema);

// Garden Plot

export interface GardenPlotDocument extends Document {
  gardenId: Types.ObjectId;
  gardenerId: Types.ObjectId;
  plants: PlotPlant[];
}

const gardenPlotSchema = new mongoose.Schema<GardenPlotDocument>(
  {
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
    gardenerId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenerSchema', required: true },
    plants: [
      {
        plotPlantId: { type: String, required: false },
        plant: { type: String, required: false },
      },
    ],
  },
  { collection: 'gardenPlots' },
);

export type GardenPlotDB = {
  gardenId: Types.ObjectId;
  gardenerId: Types.ObjectId;
  plants: PlotPlant[];
};

export const gardenPlotModel = mongoose.model<GardenPlotDocument>(
  'GardenPlotModel',
  gardenPlotSchema,
);

export interface PlantDocument extends Document {
  gardenId: Types.ObjectId;
  gardenPlotId: Types.ObjectId;
  name: string;
  age: PlantAge;
  status: PlantHealthStatus;
  lastWatered: Date;
  species: PlantType;
}

// Plant
const plantSchema = new mongoose.Schema<PlantDocument>(
  {
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
    gardenPlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenPlotSchema', required: true },
    name: { type: String, required: true },
    age: { type: String, enum: ['seedling', 'sprout', 'adult'], required: true },
    status: {
      type: String,
      enum: ['healthy', 'dehydrated', 'about to die', 'dead'],
      required: true,
    },
    lastWatered: { type: Date, required: true },
    species: { type: String, enum: ['carrot', 'rose', 'blueberry'], required: true },
  },
  { collection: 'plants' },
);

export type PlantDB = {
  gardenId: Types.ObjectId;
  gardenPlotId: Types.ObjectId;
  name: string;
  age: PlantAge;
  status: PlantHealthStatus;
  lastWatered: Date;
  species: PlantType;
};

export const plantModel = mongoose.model('PlantModel', plantSchema);

// Gardener
const gardenerSchema = new mongoose.Schema(
  {
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
    name: { type: String, required: true },
  },
  { collection: 'gardeners' },
);

export type GardenerDB = InferSchemaType<typeof gardenerSchema>;

export const gardenerModel = mongoose.model('GardenerModel', gardenerSchema);
