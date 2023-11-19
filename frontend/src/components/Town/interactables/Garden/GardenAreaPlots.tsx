import React from 'react';
import { Container, Box, chakra } from '@chakra-ui/react';
import { GardenPlotButton } from './PlotButton';
import { Plant } from '../../../../types/CoveyTownSocket';

const samplePlant1: Plant = {
  pid: 'ajsfd',
  name: 'blueberry',
  species: 'Blueberry',
  age: 'Seedling',
  lastWatered: new Date(),
  status: 'Healthy',
};

const samplePlant2: Plant = {
  pid: 'smth',
  name: 'Rosalina',
  species: 'Rose',
  age: 'Sprout',
  lastWatered: new Date(),
  status: 'Dehydrated',
};

const samplePlant3: Plant = {
  pid: 'blahblah',
  name: 'Bugs',
  species: 'Carrot',
  age: 'Adult',
  lastWatered: new Date(),
  status: 'About to Die',
};

const samplePlant4: Plant = {
  pid: 'dead',
  name: 'Dead',
  species: 'Blueberry',
  age: 'Seedling',
  lastWatered: new Date(),
  status: 'Dead',
};

const PLANTS: Plant[] = [samplePlant1, samplePlant2, samplePlant3, samplePlant4];

const StyledGarden = chakra(Container, {
  baseStyle: {
    display: 'flex',
    width: '400px',
    height: '400px',
    padding: '0px',
    flexWrap: 'wrap',
  },
});

/**
 * Renders each individual plot styled for the garden together as one component.
 * The plots display as four across and four down, with scrollability vertically
 * to view other plots that do not fit in the view.
 * @returns {JSX.Element} GardenPlots
 */
export function GardenAreaPlots(): JSX.Element {
  const users: string[] = [
    'user1',
    'user2',
    'user3',
    'user4',
    'katherine',
    'tracy',
    'surabhi',
    'madison',
  ];

  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {users.map((username, index) => {
          return (
            <GardenPlotButton
              fontSize='20px'
              key={`${index}`}
              username={username}
              plants={PLANTS}></GardenPlotButton>
          );
        })}
      </StyledGarden>
    </Box>
  );
}
