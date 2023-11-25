/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from 'react';
import TownController, { useInteractable } from '../../../../classes/TownController';
import useTownController from '../../../../hooks/useTownController';
import { InteractableID } from '../../../../types/CoveyTownSocket';
import GameAreaInteractable from '../GameArea';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  Tag,
  TagLabel,
  Avatar,
  VStack,
  ModalBody,
  Container,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
} from '@chakra-ui/react';
import { GardenAreaPlots, PLANTS } from './GardenAreaPlots';
import { GardenButton } from './GardenButton';
import { useToast } from '@chakra-ui/react';
import { MyGarden } from './MyGarden';

/**
 * Renders the plots and other components of the overall community garden area.
 * @param {InteractableID} interactableID
 * @returns {JSX.Element} GardenArea
 */
export function GardenArea({ interactableID }: { interactableID: InteractableID }): JSX.Element {
  const toast = useToast();
  const townController: TownController = useTownController();
  const currUsername = townController.ourPlayer.userName;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const toastMsg = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | undefined,
    duration: number,
  ) => {
    toast({
      title,
      status,
      duration,
      isClosable: true,
    });
  };

  const enterYourGarden = () => {
    setShow(true);
    toastMsg('Entering your garden', 'success', 4000);
  };

  useEffect(() => {
    const definedPlants = PLANTS.map(plant => plant.plant).filter(plant => plant !== undefined);
    definedPlants.forEach(plant => {
      if (plant?.status === 'Dehydrated') {
        toastMsg(
          plant.name + ' (' + plant.species + ') is dehydrated! Please add water!',
          'warning',
          9000,
        );
      }
      if (plant?.status === 'About to Die') {
        toastMsg(
          plant.name + ' (' + plant.species + ') is about to die! Please add water!',
          'error',
          9000,
        );
      }
      if (plant?.status === 'Dead') {
        toastMsg(
          plant.name + ' (' + plant.species + ') is dead! Please remove plant!',
          'error',
          9000,
        );
      }
    });
  }, [toastMsg]);

  return (
    <Container>
      {show &&
        MyGarden(currUsername, {
          isOpen: show,
          onClose: handleClose,
          plants: PLANTS,
        })}
      <VStack>
        <ModalHeader textAlign='center'>{'Community Garden'}</ModalHeader>
        <ModalBody textAlign='center'>
          <Tag
            size='lg'
            colorScheme='green'
            variant='solid'
            borderRadius='full'
            marginBottom={'0.8em'}>
            <Avatar
              size='xs'
              ml={-1}
              mr={2}
              src='https://dinopixel.com/preload/0223/-profile-pic-1676795544.png'
            />
            <TagLabel>Welcome, {currUsername}!</TagLabel>
          </Tag>
        </ModalBody>
      </VStack>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              <b>Garden Instructions</b>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel>
            <VStack>
              <p>
                To see your garden, select this button or find your highlighted garden in the grid
                below. You will be able to take care of your plants only in your garden. While you
                can view other user's gardens, you cannot tend their plants. Make sure to water your
                plants on time so they don't die!
              </p>
              <GardenButton
                label={'My Garden'}
                color={'#7ED191'}
                hoverColor={'#87E752'}
                onClick={enterYourGarden}
              />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br />
      <GardenAreaPlots></GardenAreaPlots>
      <br />
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
