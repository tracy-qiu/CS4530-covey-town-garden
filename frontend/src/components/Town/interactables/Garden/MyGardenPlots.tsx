import React from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import { PlantPlotButton } from './PlotButton';
import { FrontendGardenPlot, PlotPlant } from '../../../../types/CoveyTownSocket';

export type MyGardenPlotsProps = {
  gardenId: string;
  gardenPlotId: string;
  username: string;
  plants: PlotPlant[];
};

/**
 * Renders plant plots for user's garden as one component.
 * @param { username, plants } MyGardenPlotsProps username of gardener and list of plants to display in user's garden
 * @returns {JSX.Element} GardenPlots
 */
export function MyGardenPlots({
  gardenId,
  gardenPlotId,
  username,
  plants,
}: MyGardenPlotsProps): JSX.Element {
  //useEffect -> tracks garden controller
  const plantNames: (string | undefined)[] = plants
    .filter(plant => plant.plant !== undefined)
    .map(plant => plant.plant?.name);

  return (
    <Container>
      <SimpleGrid spacing={3} columns={2}>
        {plants.map((plant, index) => {
          return (
            <PlantPlotButton
              key={index}
              gardenId={gardenId}
              gardenPlotId={gardenPlotId}
              username={username}
              plantNames={plantNames}
              plotPlant={{
                plotPlantId: plant.plotPlantId,
                plantId: plant.plantId,
                plant: plant.plant,
              }}
            />
          );
        })}
      </SimpleGrid>
      <br />
    </Container>
  );
}
