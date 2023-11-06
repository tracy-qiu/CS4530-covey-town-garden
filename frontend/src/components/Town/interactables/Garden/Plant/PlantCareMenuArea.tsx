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
import PlantTool from './PlantTool';
import { Plant } from '../../../../../types/CoveyTownSocket';

export type PlantToolAreaProps = {
  plant: Plant;
  showTools: boolean;
}

/**
 *
 * @returns
 */
export default function PlantCareMenuArea({ plant, showTools }: PlantToolAreaProps): JSX.Element {
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
            <ModalHeader>Plant Care Menu</ModalHeader>
            <ModalCloseButton />
            <PlantDetails plant={plant}/>
            <br />
            {showTools && (<><PlantTool plant={plant} /></>)}
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
}
