import React, { useCallback, useEffect, useState } from 'react';
//import PlayerController from '../../../../classes/PlayerController';
import { useInteractable, useInteractableAreaController } from '../../../../classes/TownController';
import useTownController from '../../../../hooks/useTownController';
import { InteractableID } from '../../../../types/CoveyTownSocket';
import GameAreaInteractable from '../GameArea';
import { extendTheme } from '@chakra-ui/react';
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
  chakra,
  Button,
} from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    custom: {
      primary: '793D00',
    },
  },
});

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '33%',
    border: '1px solid teal',
    color: '793D00',
    height: '33%',
    fontSize: '50px',
    _disabled: {
      opacity: '100%',
    },
  },
});

const StyledGarden = chakra(Container, {
  baseStyle: {
    display: 'flex',
    width: '400px',
    height: '400px',
    padding: '5px',
    flexWrap: 'wrap',
  },
});

export function GardenArea({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  const garden: number[][] = [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
  ];
  return (
    <Container>
      <Spacer />
      <StyledGarden>
        {garden.map((row, rowIndex) => {
          return row.map((plot, colIndex) => {
            return <StyledPlot key={`${rowIndex}.${colIndex}`}></StyledPlot>;
          });
        })}
      </StyledGarden>
    </Container>
  );
}
/**
 * A wrapper component for the TicTacToeArea component.
 * Determines if the player is currently in a tic tac toe area on the map, and if so,
 * renders the TicTacToeArea component in a modal.
 *
 */
export default function TicTacToeAreaWrapper(): JSX.Element {
  const gameArea = useInteractable<GameAreaInteractable>('gameArea');
  const townController = useTownController();
  const closeModal = useCallback(() => {
    if (gameArea) {
      townController.interactEnd(gameArea);
      const controller = townController.getGameAreaController(gameArea);
      controller.leaveGame();
    }
  }, [townController, gameArea]);

  if (gameArea && gameArea.getData('type') === 'TicTacToe') {
    return (
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'Community Garden'}</ModalHeader>
          <ModalCloseButton />
          <GardenArea interactableID={gameArea.name} />;
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
