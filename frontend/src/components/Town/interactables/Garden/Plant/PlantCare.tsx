import React from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
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
import { SeedManual } from './SeedManual';

export type PlantCareProps = {
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
  { plant }: PlantCareProps,
): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />
      <ModalContent bgColor='#FFFEF6'>
        <Container>
          <ModalHeader>Plant Care</ModalHeader>
          <Divider borderColor='black'></Divider>
          <ModalCloseButton />
          <PlantDetails plantType={plant.species} />
          <br />
          <PlantActions plant={plant} />
        </Container>
      </ModalContent>
    </Modal>
  );
}
