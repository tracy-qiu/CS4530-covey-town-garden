import React from 'react';
import { Plant } from '../../../../types/CoveyTownSocket';
import { Container, Box, chakra, Button } from '@chakra-ui/react';
import { PlantPlotButton } from './PlotButton';

const StyledGarden = chakra(Container, {
  baseStyle: {
    display: 'flex',
    width: '400px',
    height: '400px',
    padding: '0px',
    flexWrap: 'wrap',
  },
});

export type MyGardenPlotsProps = {
  plants: Plant[];
};

/**
 * Renders plant plots for user's garden as one component.
 * @param {Plant[]} list of plants to display in user's garden
 * @returns {JSX.Element} GardenPlots
 */
export function MyGardenPlots({ plants }: MyGardenPlotsProps): JSX.Element {
  //useEffect -> tracks garden controller

  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {plants.map((plant, index) => {
          return (
            <PlantPlotButton
              key={`${index}`}
              plantCareProps={{ plant: plant, showActions: true }}
            />
          );
        })}
      </StyledGarden>
    </Box>
  );
}
