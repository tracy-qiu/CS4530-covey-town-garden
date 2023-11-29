/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useState } from 'react';
import TownController, { useInteractable } from '../../../../classes/TownController';
import useTownController from '../../../../hooks/useTownController';
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
import { gardenApiClient } from '../../../../classes/garden-client';
import { PlotPlant } from '../../../../types/CoveyTownSocket';

/**
 * Renders the plots and other components of the overall community garden area.
 * @param {InteractableID} interactableID
 * @returns {JSX.Element} GardenArea
 */
export function GardenArea(): JSX.Element {
  const toast = useToast();
  const townController: TownController = useTownController();
  const currUsername = townController.ourPlayer.userName;
  const [show, setShow] = useState(false);
  const [plants, setPlants] = useState<Record<string, unknown>[]>([]);
  const [gardenId, setGardenId] = useState('');
  const [gardenPlotId, setGardenPlotId] = useState('');

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
    const updateGardenDetails = async () => {
      const garden = await gardenApiClient.getGardenByTown(townController.townID);
      const gid = garden._id;
      const gardeners = await gardenApiClient.getGardenersByGarden(gid);
      const gardener = gardeners.find(g => g.name === townController.ourPlayer.userName);
      const plots = await gardenApiClient.getPlotsByGarden(gid);
      const plot = plots.find(p => p.gardenerId === gardener?._id);
      if (plot) {
        const newPlants = plot.plants.map(async (plotPlant: PlotPlant) => {
          const plant =
            plotPlant.plantId !== null
              ? await gardenApiClient.getPlant(plotPlant.plantId).catch(error => {
                  if (error.response && error.response.status === 204) {
                    return undefined;
                  }
                })
              : undefined;
          return { plotPlantId: plotPlant.plotPlantId, plant };
        });
        setPlants(await Promise.all(newPlants));
        setGardenPlotId(plot._id);
      }
      setGardenId(gid);
    };
    updateGardenDetails();
  });

  return (
    <Container>
      {show &&
        MyGarden(currUsername, {
          isOpen: show,
          onClose: handleClose,
          gardenId: gardenId,
          gardenPlotId: gardenPlotId,
          plants: plants,
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
              src='https://classroomclipart.com/image/static7/preview2/potted-succulent-plant-with-a-pink-flower-57125.jpg'
            />
            <TagLabel>Welcome, {currUsername}!</TagLabel>
          </Tag>
          <br />
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
            <p>
              To see your garden, click the ‘My Garden’ button at the very bottom of this modal or
              find your highlighted garden in the grid below. You will be able to take care of the
              plants only in your garden. While you can view other user's gardens, you cannot tend
              their plants. Make sure to water your plants on time so they don't die!
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <br />
      <GardenAreaPlots></GardenAreaPlots>
      <br />
      <VStack>
        <GardenButton label={'My Garden'} type='MyGarden' onClick={enterYourGarden} />
      </VStack>

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
    }
  }, [townController, gameArea]);

  if (gameArea && gameArea.getData('type') === 'Garden') {
    return (
      <Modal isOpen={true} onClose={closeModal} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />
        <ModalContent bgColor='#FFFEF6'>
          <GardenArea />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    );
  }
  return <></>;
}
