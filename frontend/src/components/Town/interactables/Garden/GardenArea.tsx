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
<<<<<<< HEAD
=======
  Spacer,
>>>>>>> made some updates
  Button,
  Box,
  HStack,
  VStack,
  ModalBody,
<<<<<<< HEAD
  Container,
=======
>>>>>>> made some updates
} from '@chakra-ui/react';
import { GardenAreaPlots } from './GardenAreaPlots';
import { GardenButton } from './GardenButton';
import { useToast } from '@chakra-ui/react';

/**
 * Renders the plots and other components of the overall community garden area.
 * @param {InteractableID} interactableID
 * @returns {JSX.Element} GardenArea
 */
export function GardenArea({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  const toast = useToast();
  const enterYourGarden = () => {
    toast({
      title: 'Entering your garden',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Container>
      <VStack>
        <ModalHeader textAlign='center'>{'Community Garden'}</ModalHeader>
        <ModalBody textAlign='center'>
          <b>Welcome, username!</b>
        </ModalBody>
        <HStack>
          {/* <Box border='1px solid black'>{'Users: '}</Box> */}
          <GardenButton
            label={'My Garden'}
            color={'#7ED191'}
            hoverColor={'#87E752'}
            fn={enterYourGarden}
          />
        </HStack>
        <GardenAreaPlots></GardenAreaPlots>
        <br />
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
    return (
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />
        <ModalContent bgColor='#FFFEF6'>
          <GardenArea interactableID={''}></GardenArea>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
