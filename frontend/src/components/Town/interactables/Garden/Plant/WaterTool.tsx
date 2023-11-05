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
export default function WaterTool({plant}: {plant: Plant}): JSX.Element {
  const waterPlant = (plantID : number) => {
    //waterPlant
  }
  return (
    <Container>
      <h1>Watering Status</h1>
      <h2>Last watered: {plant.lastWateredTime}</h2>
      <Button colorScheme='blue' onClick={() => waterPlant(plant.id)}>Water me!</Button>
    </Container>
  );
}
