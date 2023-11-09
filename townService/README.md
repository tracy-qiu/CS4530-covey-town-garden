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