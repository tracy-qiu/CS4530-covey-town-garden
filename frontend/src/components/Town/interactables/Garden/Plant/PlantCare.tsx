import React from 'react';
import { useState } from 'react';
import {
  Button,
  Container,
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
export default function PlantCare({ plant, showActions }: PlantCareProps): JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button colorScheme='teal' onClick={handleShow}>
        Show Modal
      </Button>

      <Modal isOpen={show} onClose={handleClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <Container>
            <ModalHeader>Plant Care</ModalHeader>
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
    </div>
  );
}
