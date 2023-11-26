import React from 'react';
import {
  Container,
  VStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import PlantActions from './PlantActions';
import { Plant } from '../../../../../types/CoveyTownSocket';
import useTownController from '../../../../../hooks/useTownController';

export type PlantCareProps = {
  username: string;
  plant: Plant;
};

/**
 * Shows information about a plant, its health status, and actions to do on the plant (watering, remove)
 * @param isOpen boolean to open modal
 * @param onClose function to close modal
 * @param { username, plant } PlantCareProps username of the owner and plant
 * @returns {JSX.Element} component
 */
export default function PlantCare(
  isOpen: boolean,
  onClose: () => void,
  { username, plant }: PlantCareProps,
): JSX.Element {
  const currUsername = useTownController().ourPlayer.userName;
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />
      <ModalContent bgColor='#FFFEF6'>
        <Container paddingBottom={'2em'}>
          <VStack>
            <ModalHeader>
              {username == currUsername ? 'My Garden' : username + "'s" + ' Garden'}
            </ModalHeader>
          </VStack>
          <ModalCloseButton />
          <PlantDetails species={plant.species} age={plant.age} />
          <br />
          {currUsername === username && <PlantActions plant={plant} />}
        </Container>
      </ModalContent>
    </Modal>
  );
}
