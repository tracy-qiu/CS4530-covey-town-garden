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

export type PlantCareProps = {
  plant: Plant;
  showActions: boolean;
};

/**
 * Shows information about a plant, its health status, and actions to do on the plant (watering, remove)
 * @param { plant, showActions }
 * @returns {JSX.Element} component
 */
export default function PlantCare(
  isOpen: boolean,
  onClose: () => void,
  { plant, showActions }: PlantCareProps,
): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bgColor='#FFFEF6'>
        <Container>
          <ModalHeader>Plant Care</ModalHeader>
          <Divider borderColor='black'></Divider>
          <ModalCloseButton />
          <PlantDetails plant={plant} />
          <br />
          {showActions && (
            <>
              <PlantActions plant={plant} />
            </>
          )}
        </Container>
      </ModalContent>
    </Modal>
  );
}
