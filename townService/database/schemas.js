import mongoose from "mongoose";

// Towns
const townSchema = mongoose.Schema({
    admin: { type: String, required: true }, // would reference gardeners table? or new admin table? // depends on user definitions
}, {collection: 'towns'});

export const townModel = mongoose.model('TownModel', townSchema);

// Gardens
const gardenSchema = mongoose.Schema({
    townId: { type: mongoose.Schema.Types.ObjectId, ref: 'townSchema', required: true },
}, {collection: 'gardens'});

export const gardenModel = mongoose.model('GardenModel', gardenSchema);

// Garden Plot
const gardenPlotSchema = mongoose.Schema({
    gardenId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenSchema', required: true },
}, {collection: 'gardenPlots'});

export const gardenPlotModel = mongoose.model('GardenPlotModel', gardenPlotSchema);

// Plant Type
const plantTypeSchema = mongoose.Schema({
    speciesName: { type: String, required: true },
}, {collection: 'PlantType'});

export const plantTypeModel = mongoose.model('PlantTypeModel', plantTypeSchema);

// Plant
const plantSchema = mongoose.Schema({
    gardenPlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenPlotSchema', required: true },
    name: { type: String, required: true },
    age: Number, // should be integer?
    daysSinceLastWater: Number, // should be integer?
    species: { type: mongoose.Schema.Types.ObjectId, ref: 'PlantType', required: true },
}, {collection: 'plants'});

export const plantModel = mongoose.model('PlantModel', plantSchema);

// Gardener
const gardenerSchema = mongoose.Schema({
    gardenPlotId: { type: mongoose.Schema.Types.ObjectId, ref: 'gardenPlotSchema', required: true },
    name: { type: String, required: true },
}, {collection: 'gardeners'});

export const gardenerModel = mongoose.model('GardenerModel', gardenerSchema);
