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
import { Plant } from '../../../../../types/CoveyTownSocket';
/**
 *
 * @returns
 */
export default function RemovePlant({plant}: {plant: Plant}): JSX.Element {
  const removePlant = (plantID : number) => {
    // async call to remove plant
  }

  return (
    <Container>
      <h1>Remove Plant</h1>
      <Button colorScheme='red' onClick={() => removePlant(plant.id)}>Remove Plant</Button>
    </Container>
  );
}
