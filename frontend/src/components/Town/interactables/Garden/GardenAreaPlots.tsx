import React, { useCallback, useEffect, useState } from 'react';
//import PlayerController from '../../../../classes/PlayerController';
import { useInteractable, useInteractableAreaController } from '../../../../classes/TownController';
import useTownController from '../../../../hooks/useTownController';
import { InteractableID, Plant } from '../../../../types/CoveyTownSocket';
import GameAreaInteractable from '../GameArea';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Container,
  Spacer,
  Grid,
  GridItem,
  Box,
  chakra,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import PlantCare from './Plant/PlantCare';
import PlotButton from './PlotButton';

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
    _hover: { backgroundColor: '#C4A484' },
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

/**
 * Renders each individual plot styled for the garden together as one component.
 * The plots display as four across and four down, with scrollability vertically
 * to view other plots that do not fit in the view.
 * @returns {JSX.Element} GardenPlots
 */
export function GardenAreaPlots(): JSX.Element {
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

  const garden: Plant[][] = [
    [samplePlant1, samplePlant2, samplePlant3, samplePlant1],
    [samplePlant4, samplePlant3, samplePlant2, samplePlant2],
  ];

  const [clicked, setClick] = useState(false);

  const handleClick = () => {
    setClick(true);
  };

  //useState -> gardenPlots

  //useState -> pop up another modal on top of first? replace modal?

  //useEffect -> tracks garden controller

  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {garden.map((row, rowIndex) => {
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
