import React, { useEffect, useState } from 'react';
import { Plant, PlantType } from '../../../../../types/CoveyTownSocket';
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
import { GardenButton } from '../GardenButton';

type SeedManualProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SeedManual({ isOpen, onClose }: SeedManualProps): JSX.Element {
  const plantSeed = (plantType: PlantType) => {
    alert('Planting ' + plantType);
  };

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
                    <br />
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GardenButton
                        label={'Plant Me!'}
                        color={'#C4A484'}
                        hoverColor={'#CCC5AD'}
                        fn={() => plantSeed('Rose')}
                      />
                    </div>
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
                    <br />
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GardenButton
                        label={'Plant Me!'}
                        color={'#C4A484'}
                        hoverColor={'#CCC5AD'}
                        fn={() => plantSeed('Blueberry')}
                      />
                    </div>
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
                    <br />
                    <div
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <GardenButton
                        label={'Plant Me!'}
                        color={'#C4A484'}
                        hoverColor={'#CCC5AD'}
                        fn={() => plantSeed('Carrot')}
                      />
                    </div>
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
