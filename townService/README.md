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
- post /town 
- get one garden by townId /town/{townId}/garden

garden collection 
- post /garden 
  - requestBody: {townId: string}
- update garden /garden/update
  - requestBody: { plotNumber: number, }
- delete /garden/{gardenId} 

gardener collection 
- post /garden/gardener
  - requestBody: { name: string, gardenId: string }
- update gardener /garden/gardner/update
  - requestBody: { gardenId: string, name: string }
- get gardeners by gardenId /garden/{gardenId}/gardeners
- get one gardener by gardener /garden/gardeners/{gardenerId}
- delete gardener by gardenerId /garden/gardeners/{gardener}

plot collection 
- post /garden/plot
  - requestBody: { gardenId: string; gardenerId: string; }
- update plot /garden/plot/update
  - requestBody: {gardenId: string, plotNumber: number, plantId: string}
- get plots by gardenId /garden/{gardenId}/plots
- get plots by gardenerId /garden/{gardenerId}/plots
- get one plot by plotId /garden/plots/{plotId}
- delete plot by plotId /garden/plots/{plotId}

plant collection 
- post /garden/plant 
  - requestBody: { gardenId: string; gardenPlotId: string; name: string; species: string }
- update plant age by plantId /garden/plants/updateAge
  - requestBody: {plantId: string, age : string}
- update plant last watered /garden/plant/updatelLastWatered 
  - requestBody: {plantId: string}
- get one plant by plantId /garden/plants/{plantId}
- get plants by gardenId /garden/{gardenId}/plants -might not need it 
- get plants by plotId /garden/plots/{plotId}/plants
- delete plant by plantId /garden/plants/{plantId}


delete action deletes all items associated with the thing you are deleting 