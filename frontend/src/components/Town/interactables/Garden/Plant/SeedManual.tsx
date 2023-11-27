import React, { useState } from 'react';
import { PlantType } from '../../../../../types/CoveyTownSocket';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Box,
  ModalBody,
  Container,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  Input,
  Spacer,
  HStack,
  VStack,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import { GardenButton } from '../GardenButton';
import { useToast } from '@chakra-ui/react';
import useTownController from '../../../../../hooks/useTownController';
import { PLANT_TYPES_DATA } from '../garden-data/data';

type SeedManualProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  plantNames: (string | undefined)[];
};

/**
 * Displays manual of the 3 types of seeds to plant and their information
 * Will only allow owner of garden to plant seeds
 * @param { isOpen, onClose, username } SeedManualProps opening and closing modal mechanisms, username of the gardener, and existing names of plant in garden
 * @returns {JSX.Element} component
 */
export function SeedManual({
  isOpen,
  onClose,
  username,
  plantNames,
}: SeedManualProps): JSX.Element {
  const toast = useToast();
  const currUsername = useTownController().ourPlayer.userName;
  const [newPlantName, setNewPlantName] = useState('');

  const toastMsg = (
    title: string,
    status: 'info' | 'warning' | 'success' | 'error' | undefined,
  ) => {
    toast({
      title,
      status,
      duration: 4000,
      isClosable: true,
    });
  };

  const plantSeed = (plantType: PlantType) => {
    if (newPlantName === '') {
      toastMsg('Plant must be given a name', 'error');
    } else if (plantNames.length > 0 && plantNames.includes(newPlantName)) {
      toastMsg(
        'Plant must be given a unique name in garden. ' + newPlantName + ' already exists!',
        'error',
      );
    } else {
      // TBD: add plant to list of plots
      toastMsg('Planting ' + newPlantName + ' (' + plantType.toString() + ')', 'success');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />

      <ModalContent bgColor='#FFFEF6'>
        <ModalBody>
          <Container>
            <VStack>
              <ModalHeader>Seed Manual</ModalHeader>
            </VStack>
            <Accordion allowToggle>
              {PLANT_TYPES_DATA.map((type, index) => {
                return (
                  <AccordionItem key={type} data-testid={'seedManualAccordion' + index}>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>{type}</b>
                        <AccordionIcon />
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <PlantDetails species={type} age={undefined} />
                      <br />
                      {currUsername === username && (
                        <HStack>
                          <Input
                            data-testid={'plantMeInput' + index}
                            type={'text'}
                            placeholder='Enter plant name'
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              setNewPlantName(event.target.value);
                            }}
                          />
                          <Spacer />
                          <GardenButton
                            data-testid={'plantMeBtn' + index}
                            label={'Plant Me!'}
                            type='PlantMe'
                            onClick={() => plantSeed(type)}
                          />
                        </HStack>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Container>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
