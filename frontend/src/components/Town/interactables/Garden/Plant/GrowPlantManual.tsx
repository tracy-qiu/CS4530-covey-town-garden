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

export function GrowPlantManual(
  username: string,
  isOpen: boolean,
  onClose: () => void,
): JSX.Element {
  const [growPlant, setGrowPlant] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
        <ModalOverlay />

        <ModalContent bgColor='#FFFEF6'>
          <ModalBody>
            <Container>
              <Accordion allowToggle>
                <AccordionItem>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <b>Rose</b>
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>
                  <AccordionPanel>
                    <p>Rose</p>
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
                    <p>Blueberry</p>
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
                    <p>Carrot</p>
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
