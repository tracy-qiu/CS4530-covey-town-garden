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
import WaterTool from './WaterTool';
import RemovePlant from './RemovePlant';
import { Plant } from '../../../../../types/CoveyTownSocket';

export type PlantToolAreaProps = {
  plant: Plant;
  showTools: boolean;
}

/**
 *
 * @returns
 */
export default function PlantToolArea({ plant, showTools }: PlantToolAreaProps): JSX.Element {
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
            {showTools && (<><WaterTool plant={plant} /><RemovePlant plant={plant} /></>)}
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
}
