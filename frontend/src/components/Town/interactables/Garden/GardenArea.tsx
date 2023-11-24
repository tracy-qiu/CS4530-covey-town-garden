import React, { useCallback, useEffect, useState } from 'react';
//import PlayerController from '../../../../classes/PlayerController';
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
  Button,
  Badge,
  Box,
  Tag,
  TagLabel,
  AvatarGroup,
  Avatar,
  HStack,
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
  const curUsername = townController.ourPlayer.userName;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const enterYourGarden = () => {
    setShow(true);
    toast({
      title: 'Entering your garden',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const definedPlants = PLANTS.map(p => p.plant).filter(p => p !== undefined);
    definedPlants.forEach(p => {
      if (p?.status === 'Dehydrated') {
        toast({
          title: p.name + ' (' + p.species + ') is dehydrated! Please add water!',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      }
      if (p?.status === 'About to Die') {
        toast({
          title: p.name + ' (' + p.species + ') is about to die! Please add water!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      if (p?.status === 'Dead') {
        toast({
          title: p.name + ' (' + p.species + ') is dead! Please remove plant!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }, [toast]);

  return (
    <>
      {show &&
        MyGarden(curUsername, {
          isOpen: show,
          onClose: handleClose,
          plants: PLANTS,
        })}

      <Container>
        <VStack>
          <ModalHeader textAlign='center'>{'Community Garden'}</ModalHeader>
          <ModalBody textAlign='center'>
            <Tag size='lg' colorScheme='green' variant='solid' borderRadius='full'>
              <Avatar
                size='xs'
                ml={-1}
                mr={2}
                src='https://dinopixel.com/preload/0223/-profile-pic-1676795544.png'
              />
              <TagLabel>Welcome, {curUsername}!</TagLabel>
            </Tag>
          </ModalBody>
        </VStack>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Game Info</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
            <AccordionPanel>
              <VStack>
                <p>
                  To see your garden, select this button or find your highlighted garden in the grid
                  below. You will be able to take care of your plants only in your garden. While you
                  can view other user's gardens, you cannot tend their plants. Make sure to water
                  your plants on time so they don't die!
                </p>
                <GardenButton
                  label={'My Garden'}
                  color={'#7ED191'}
                  hoverColor={'#87E752'}
                  fn={enterYourGarden}
                  disabled={false}
                />
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <GardenAreaPlots></GardenAreaPlots>
        <br />
      </Container>
    </>
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
