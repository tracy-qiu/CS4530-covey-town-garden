import React from 'react';
import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
  List,
  ListItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import WaterTool from './WaterTool';
import RemovePlant from './RemovePlant';
import { Plant } from '../../../../../types/CoveyTownSocket';
/**
 *
 * @returns
 */
export default function PlantToolArea({plant}: {plant: Plant}): JSX.Element {
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
            <ModalHeader>Plant Tool Menu</ModalHeader>
            <ModalCloseButton />
            <PlantDetails plant={plant}/>
            <WaterTool plant={plant}/>
            <RemovePlant plant={plant}/>
          </Container>
        </ModalContent>
      </Modal>
    </div>
  );
}
