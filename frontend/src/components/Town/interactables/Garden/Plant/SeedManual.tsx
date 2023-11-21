import React, { useEffect, useState } from 'react';
import { Plant } from '../../../../../types/CoveyTownSocket';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Box,
  HStack,
  VStack,
  ModalBody,
  Container,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Heading,
  Badge,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';

type GrowPlantManualProps = {
  username: string;
  isOpen: boolean;
  onClose: () => void;
};

export function GrowPlantManual({ username, isOpen, onClose }: GrowPlantManualProps): JSX.Element {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />

        <ModalContent bgColor='#FFFEF6'>
          <ModalBody>
            <Container>
              <ModalHeader>Seed Manual</ModalHeader>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <b>Rose</b>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    <PlantDetails plantType={'Rose'} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <b>Blueberry</b>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    <PlantDetails plantType={'Blueberry'} />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <b>Carrot</b>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    <PlantDetails plantType={'Carrot'} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Container>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
}
