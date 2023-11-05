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
export default function RemovePlant(): JSX.Element {
  return (
    <Container>
      <h1>Remove Plant</h1>
      <Button colorScheme='red'>Remove Plant</Button>
    </Container>
  );
}
