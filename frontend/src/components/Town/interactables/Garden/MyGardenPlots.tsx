import React from 'react';
import { PlotPlant } from '../../../../types/CoveyTownSocket';
import { Container, SimpleGrid } from '@chakra-ui/react';
import { PlantPlotButton } from './PlotButton';

export type MyGardenPlotsProps = {
  username: string;
  plants: PlotPlant[];
};

/**
 * Renders plant plots for user's garden as one component.
 * @param {PlotPlant[]} list of plants to display in user's garden
 * @returns {JSX.Element} GardenPlots
 */
export function MyGardenPlots({ username, plants }: MyGardenPlotsProps): JSX.Element {
  //useEffect -> tracks garden controller

  return (
    <Container>
      <SimpleGrid spacing={3} columns={2}>
        {plants.map((plant, index) => {
          return (
            <PlantPlotButton
              key={plant.plantId}
              username={username}
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
