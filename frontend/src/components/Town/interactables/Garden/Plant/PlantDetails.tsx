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
export default function PlantDetails(): JSX.Element {
  return (
    <Container>
      <h1>Rose</h1>
      <h1>Care Instructions</h1>
      <h1>Lifecyle</h1>
    </Container>
  );
}
