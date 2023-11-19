import mongoose, { InferSchemaType } from 'mongoose';

// Towns
const townSchema = new mongoose.Schema(
  {
    admin: { type: String, required: true }, // would reference gardeners table? or new admin table? // depends on user definitions
  },
  { collection: 'towns' },
);

export type TownDB = InferSchemaType<typeof townSchema>;

export const townModel = mongoose.model('TownModel', townSchema);

// Gardens
const gardenSchema = new mongoose.Schema(
  {
    townId: { type: mongoose.Schema.Types.ObjectId, ref: 'townSchema', required: true },
    gardenPlots: Array,
  },
  { collection: 'gardens' },
);

export type GardenDB = InferSchemaType<typeof gardenSchema>;

export const gardenModel = mongoose.model('GardenModel', gardenSchema);

// Garden Plot
const gardenPlotSchema = new mongoose.Schema(
  {
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
    gardenerId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenerSchema', required: true },
    topLeftPid: { type: mongoose.Schema.Types.ObjectId, ref: 'plantSchema', required: false },
    topRightPid: { type: mongoose.Schema.Types.ObjectId, ref: 'plantSchema', required: false },
    bottomLeftPid: { type: mongoose.Schema.Types.ObjectId, ref: 'plantSchema', required: false },
    bottomRightPid: { type: mongoose.Schema.Types.ObjectId, ref: 'plantSchema', required: false },
  },
  { collection: 'gardenPlots' },
);

export type GardenPlotDB = InferSchemaType<typeof gardenPlotSchema>;

export const gardenPlotModel = mongoose.model('GardenPlotModel', gardenPlotSchema);

// Plant Type
const plantTypeSchema = new mongoose.Schema(
  {
    speciesName: { type: String, required: true },
  },
  { collection: 'PlantType' },
);

export type PlantTypeDB = InferSchemaType<typeof plantTypeSchema>;

export const plantTypeModel = mongoose.model('PlantTypeModel', plantTypeSchema);

// Plant
const plantSchema = new mongoose.Schema(
  {
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
    gardenPlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenPlotSchema', required: true },
    name: { type: String, required: true },
    age: Number, // should be of type plant age (fix after merge)
    lastWatered: Date,
    species: { type: mongoose.Schema.Types.ObjectId, ref: 'PlantType', required: true },
  },
  { collection: 'plants' },
);

export type PlantDB = InferSchemaType<typeof plantSchema>;

export const plantModel = mongoose.model('PlantModel', plantSchema);

// Gardener
const gardenerSchema = new mongoose.Schema(
  {
    gardenPlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenPlotSchema', required: true },
    name: { type: String, required: true },
  },
  { collection: 'gardeners' },
);

export type GardenerDB = InferSchemaType<typeof gardenerSchema>;

export const gardenerModel = mongoose.model('GardenerModel', gardenerSchema);
