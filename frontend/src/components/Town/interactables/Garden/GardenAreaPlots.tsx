import React from 'react';
import { Container, Box, SimpleGrid } from '@chakra-ui/react';
import { GardenPlotButton } from './PlotButton';
import { PlotPlant } from '../../../../types/CoveyTownSocket';

const samplePlant1: PlotPlant = {
  plantId: '12',
  plant: {
    pid: '1',
    name: 'blueberry',
    species: 'Blueberry',
    age: 'Seedling',
    lastWatered: new Date(),
    status: 'Healthy',
  },
};

const samplePlant2: PlotPlant = {
  plantId: '13',
  plant: {
    pid: '2',
    name: 'Rosalina',
    species: 'Rose',
    age: 'Sprout',
    lastWatered: new Date(),
    status: 'Dehydrated',
  },
};

const samplePlant3: PlotPlant = {
  plantId: '14',
  plant: {
    pid: '3',
    name: 'Bugs',
    species: 'Carrot',
    age: 'Adult',
    lastWatered: new Date(),
    status: 'About to Die',
  },
};

const undefinedPlant: PlotPlant = { plantId: '16', plant: undefined };

export const PLANTS: PlotPlant[] = [samplePlant1, samplePlant2, samplePlant3, undefinedPlant];

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
    'long username',
    'Katherine',
    'tracy',
    'surabhi',
    'madison',
    'user5',
    'user6',
    'user7',
    'user8',
  ];

  return (
    <Container>
      <SimpleGrid spacing={3} columns={4}>
        {users.map((username, index) => {
          return (
            <Box key={username}>
              <GardenPlotButton
                fontSize='20px'
                key={`${index}`}
                username={username}
                plants={PLANTS}></GardenPlotButton>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
