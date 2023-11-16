import React from 'react';
import { Plant } from '../../../../types/CoveyTownSocket';
import { Container, Box, chakra, Button } from '@chakra-ui/react';
import PlantCare from './Plant/PlantCare';

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderColor: '#EDD4B2',
    borderWidth: '2px',
    bgColor: '#793D00',
    height: '25%',
    width: '25%',
    fontSize: '50px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#793D00' },
  },
});

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
  plants: Plant[][];
};

/**
 * Renders plant plots for user's garden as one component.
 * @param {Plant[][]} 2D list of plants to display in user's garden
 * @returns {JSX.Element} GardenPlots
 */
export function MyGardenPlots({ plants }: MyGardenPlotsProps): JSX.Element {
  //useEffect -> tracks garden controller

  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {plants.map((row, rowIndex) => {
          return row.map((plant, colIndex) => {
            return (
              <StyledPlot key={`${rowIndex}.${colIndex}`}>
                <PlantCare plant={plant} showActions={true} key='sample' />
              </StyledPlot>
            );
          });
        })}
      </StyledGarden>
    </Box>
  );
}
