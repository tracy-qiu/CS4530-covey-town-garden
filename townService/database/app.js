// example database connection, should be moved to main app file location

import mongoose from "mongoose";

// replace with env variable ( ref docs )
const CONNECTION_STRING = "mongodb+srv://surabhiKeesara:<password>@garden-cluster.jhykp3h.mongodb.net/garden-area?retryWrites=true&w=majority" 

mongoose.connect(CONNECTION_STRING)

// example call of how database can be updated (would be in a controller):
const deletePlant = async(req, res) => {
    const plantToDeleteId = req.params.pid;
    const status = await plantDao.deletePlant(plantToDeleteId);
    res.json(status); // output status of call
}

// example call of how database objects can be retrieved:
const getPlant = async(req, res) => {
    const plants = await plantDao.findPlants();
    res.json(plants);
}
