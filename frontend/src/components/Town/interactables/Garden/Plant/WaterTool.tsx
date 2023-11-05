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
/**
 *
 * @returns
 */
export default function WaterTool(): JSX.Element {
  return (
    <Container>
      <h1>Watering Status</h1>
      <h2>Last watered: 2 hours</h2>
      <Button colorScheme='blue'>Water me!</Button>
    </Container>
  );
}
