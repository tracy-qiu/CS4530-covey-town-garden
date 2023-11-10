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
export function GardenPlots(): JSX.Element {
  const garden: number[][] = [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
  ];

  // const samplePlant: Plant = {
  //   pid: 'ajsfd',
  //   name: 'blueberry',
  //   species: 'Blueberry',
  //   age: 'Seedling',
  //   lastWatered: new Date(),
  //   status: 'Healthy',
  // };
  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {garden.map((row, rowIndex) => {
          return row.map((plot, colIndex) => {
            return (
              <StyledPlot key={`${rowIndex}.${colIndex}`}>{plot}</StyledPlot>
              // <PlantCare plant={samplePlant} showActions={true} key={`${rowIndex}.${colIndex}`} />
            );
          });
        })}
      </StyledGarden>
    </Box>
  );
}
