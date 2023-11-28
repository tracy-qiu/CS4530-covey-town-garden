# Townservice Client

After installing the dependencies (`npm install`), `npm start` can be used to launch the application in a local web browser. It retrieves the townservice from our REST example server and renders them in a page.

## Getting started
First, run `npm start` to generate the OpenAPI specification, server boilerplate, and start the development server.
This command will automatically reload the server as you change files in this project.
To stop the server, press control-C in the terminal.

Once you see the message "Listening on 8081", you can access this URL in your browser: 
[http://localhost:8081/docs/#/garden](http://localhost:8081/docs/#/garden)

You should now see a "Swagger" transcript-server-openapi documentation page, with a few API endpoints defined. Expand the "GET /garden" endpoint, click "Try it out", and then "Execute". Now, the field "Response Body" should have text in it like:
```
[
  {
    "id": 1,
    "gardenPlotId": "P1",
    "name": "Carrots",
    "species": 0,
    "age": 1,
    "daysSinceLastWater": 1
  },
  {
    "id": 2,
    "gardenPlotId": "P2",
    "name": "Roses",
    "species": 1,
    "age": 3,
    "daysSinceLastWater": 4
  },
  {
    "id": 3,
    "gardenPlotId": "P3",
    "name": "Blueberries",
    "species": 2,
    "age": 5,
    "daysSinceLastWater": 2
  }
]
```

This demonstrates that this endpoint of your REST API is functional.

town collection 
- get getAllTowns /town/townDB 
- get getTownByDbId/town/{dbTownId}
- post createTownInDb /town/townDB
  - requestBody: {townId: string}
- post createGarden /town/{townId}/garden 
- delete deleteDbTown /town/townDB/delete/{townId}

garden collection 
- get getAllGardens /garden 
- get getGardenById /garden/{gardenId}
- get getGardenbyTownId /garden/{townId}/garden
- post updateGarden /garden/update
  - requestBody: { gardenId: string; plotId: string }
- delete deleteGarden /garden/{gardenId} 

gardener collection 
- get getAllGardenersInGarden /garden/{gardenId}/gardeners
- get getGardener /garden/gardeners/{gardenerId}
- post addGardener /garden/gardener
  - requestBody: { name: string, gardenId: string }
- delete deleteGardener /garden/gardeners/{gardenerId} 

plot collection 
- get getAllPlotsInGarden /garden/{gardenId}/plots
- get getPlot /garden/plots/{gardenPlotId}
- post addPlot /garden/plot
  - requestBody: { gardenId: string; gardenerId: string; }
- delete deletePlot /garden/plots/{gardenPlotId}
- post updatePlot /garden/update/plot
  - requestBody: { plotId: string; plantId: string; plotLocation: number }

plant collection 
- get getAllPlantsByPlot /garden/{plotId}/plants
- get getPlantById /garden/plants/{plantId}
- post addPlant /garden/plant 
  - requestBody: { gardenId: string;
      gardenPlotId: string;
      name: string;
      species: string; }
- delete deletePlant /garden/plants/{plantId}
- post upatePlantAge /garden/update/plantAge 
  - requestBody: { plantId: string; plantAge: string }
- post updatePlantStatus /garden/update/plantStatus
  - requestBody: { plantId: string; plantStatus: string }
- post updatePlantLastWatered /garden/update/plantAge
  - requestBody: { plantId: string }

* delete action deletes all items associated with the thing you are deleting 