import React, { useCallback } from 'react';
//import PlayerController from '../../../../classes/PlayerController';
import { useInteractable } from '../../../../classes/TownController';
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
  Button,
  ModalBody,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { GardenAreaPlots } from './GardenAreaPlots';

/**
 * Renders the plots and other components of the overall community garden area.
 * @param {InteractableID} interactableID
 * @returns {JSX.Element} GardenArea
 */
export function GardenArea({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  return (
    <Container>
      <VStack>
        <HStack align='center' justify='center'>
          <ModalHeader textAlign='center'>{'Community Garden'}</ModalHeader>
          <Button color={'#395941'} bgColor={'#7ED191'} _hover={{ backgroundColor: '#87E752' }}>
            My Garden
          </Button>
        </HStack>
        <HStack>
          <Box border='1px solid black'>{'Users: '}</Box>
          <ModalBody textAlign='center'>{'Welcome, username!'}</ModalBody>
          <Spacer />
        </HStack>
        <GardenAreaPlots></GardenAreaPlots>
      </VStack>
    </Container>
  );
}

/**
 * A wrapper component for the GardenArea component.
 * Determines if the player is currently in a community garden area on the map, and if so,
 * renders the GardenArea component in a modal with the appropriate content.
 *
 */
export default function GardenAreaWrapper(): JSX.Element {
  const gameArea = useInteractable<GameAreaInteractable>('gameArea');
  const townController = useTownController();
  const closeModal = useCallback(() => {
    if (gameArea) {
      townController.interactEnd(gameArea);
      const controller = townController.getGameAreaController(gameArea);
      controller.leaveGame();
    }
  }, [townController, gameArea]);

  if (gameArea && gameArea.getData('type') === 'Garden') {
    // CHANGE TO GARDEN TYPE
    return (
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <GardenArea interactableID={''}></GardenArea>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
