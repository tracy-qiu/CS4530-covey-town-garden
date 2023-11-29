import React from 'react';
import { PlotPlant } from '../../../../types/CoveyTownSocket';
import { Container, SimpleGrid } from '@chakra-ui/react';
import { PlantPlotButton } from './PlotButton';

export type MyGardenPlotsProps = {
  username: string;
  plants: Record<string, unknown>[];
};

/**
 * Renders plant plots for user's garden as one component.
 * @param { username, plants } MyGardenPlotsProps username of gardener and list of plants to display in user's garden
 * @returns {JSX.Element} GardenPlots
 */
export function MyGardenPlots({ username, plants }: MyGardenPlotsProps): JSX.Element {
  //useEffect -> tracks garden controller
  const plantNames: (string | undefined)[] = plants
    .filter(plant => plant.plant !== undefined)
    .map(plant => plant.plant?.name);

  return (
    <Container>
      <SimpleGrid spacing={3} columns={2}>
        {plants.map(plant => {
          return (
            <PlantPlotButton
              key={plant.plantId}
              username={username}
              plantNames={plantNames}
              plotPlant={{
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
