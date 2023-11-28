import React from 'react';
import { Container, Box, SimpleGrid } from '@chakra-ui/react';
import { GardenPlotButton } from './PlotButton';
import { PlotPlant } from '../../../../types/CoveyTownSocket';

const samplePlant1: PlotPlant = {
  plotPlantId: '12',
  plant: '1',
};

const samplePlant2: PlotPlant = {
  plotPlantId: '13',
  plant: '2',
};

const samplePlant3: PlotPlant = {
  plotPlantId: '14',
  plant: '3',
};

const samplePlantDead: PlotPlant = {
  plotPlantId: '100',
  plant: '4',
};

const undefinedPlant: PlotPlant = { plotPlantId: '16', plant: undefined };

export const PLANTS: PlotPlant[] = [samplePlant1, samplePlant2, samplePlantDead, undefinedPlant];

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
