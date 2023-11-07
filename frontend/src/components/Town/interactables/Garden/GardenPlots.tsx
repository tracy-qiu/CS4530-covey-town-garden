import React, { useCallback, useEffect, useState } from 'react';
//import PlayerController from '../../../../classes/PlayerController';
import { useInteractable, useInteractableAreaController } from '../../../../classes/TownController';
import useTownController from '../../../../hooks/useTownController';
import { InteractableID } from '../../../../types/CoveyTownSocket';
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

export function GardenPlots(): JSX.Element {
  const garden: number[][] = [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
  ];

  return (
    <Box overflowX='auto'>
      <StyledGarden>
        {garden.map((row, rowIndex) => {
          return row.map((plot, colIndex) => {
            return <StyledPlot key={`${rowIndex}.${colIndex}`}>{plot}</StyledPlot>;
          });
        })}
      </StyledGarden>
    </Box>
  );
}
