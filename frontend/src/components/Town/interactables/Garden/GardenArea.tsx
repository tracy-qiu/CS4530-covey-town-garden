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
  chakra,
  Button,
  ModalBody,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { GardenPlots } from './GardenPlots';
import { GardenButton } from './GardenButton';

/**
 * Renders the plots and other components of the garden area.
 * @param {InteractableID} interactableID
 * @returns {JSX.Element} GardenArea
 */
export function GardenArea({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  return (
    <Container>
      <GardenPlots></GardenPlots>
    </Container>
  );
}
/**
 * A wrapper component for the GardenArea component.
 * Determines if the player is currently in a community garden area on the map, and if so,
 * renders the GardenArea component in a modal with the appropriate content.
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
          <VStack>
            <HStack align='center' justify='center'>
              <ModalHeader textAlign='center'>{'Community Garden'}</ModalHeader>
              <GardenButton></GardenButton>
            </HStack>
            <HStack>
              <Box border='1px solid black'>{'Users: '}</Box>
              <ModalBody textAlign='center'>{'Welcome, username!'}</ModalBody>
              <Spacer />
            </HStack>
            <ModalCloseButton />
            <GardenArea interactableID={gameArea.name} />
          </VStack>
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
