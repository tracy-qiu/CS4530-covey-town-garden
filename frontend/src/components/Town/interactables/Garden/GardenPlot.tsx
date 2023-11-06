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
} from '@chakra-ui/react';

export function GardenPlot({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  const StyledPlot = chakra(Button, {
    baseStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: '33%',
      border: '1px solid black',
      height: '33%',
      fontSize: '50px',
      _disabled: {
        opacity: '100%',
      },
    },
  });

  return (
    <Container>
      <StyledPlot></StyledPlot>
    </Container>
  );
}
