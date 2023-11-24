import React from 'react';
import {
  Container,
  Divider,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import PlantActions from './PlantActions';
import { Plant } from '../../../../../types/CoveyTownSocket';

export type PlantCareProps = {
  username: string;
  plant: Plant;
};

/**
 * Shows information about a plant, its health status, and actions to do on the plant (watering, remove)
 * @param { plant, showActions }
 * @returns {JSX.Element} component
 */
export default function PlantCare(
  isOpen: boolean,
  onClose: () => void,
  { username, plant }: PlantCareProps,
): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />
      <ModalContent bgColor='#FFFEF6'>
        <Container>
          <ModalHeader>Plant Care</ModalHeader>
          <Divider borderColor='black'></Divider>
          <ModalCloseButton />
          <PlantDetails species={plant.species} age={plant.age} />
          <br />
          <PlantActions plant={plant} username={username} />
        </Container>
      </ModalContent>
    </Modal>
  );
}
