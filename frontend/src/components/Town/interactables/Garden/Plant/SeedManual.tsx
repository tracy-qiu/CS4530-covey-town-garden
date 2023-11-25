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
};

/**
 * Displays manual of the 3 types of seeds to plant and their information
 * Will only allow owner of garden to plant seeds
 * @param { isOpen, onClose, username } SeedManualProps opening and closing modal mechanisms, and username of the gardener
 * @returns {JSX.Element} component
 */
export function SeedManual({ isOpen, onClose, username }: SeedManualProps): JSX.Element {
  const toast = useToast();
  const currUsername = useTownController().ourPlayer.userName;
  const [newPlantName, setNewPlantName] = useState('');

  const plantSeed = (plantType: PlantType) => {
    if (newPlantName === '') {
      toast({
        title: 'Plant must be given a name',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      // TBD: add plant to list of plots
      toast({
        title: 'Planting ' + newPlantName + ' (' + plantType.toString() + ')',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} size='xl'>
      <ModalOverlay />

      <ModalContent bgColor='#FFFEF6'>
        <ModalBody>
          <Container>
            <ModalHeader>Seed Manual</ModalHeader>
            <Accordion allowToggle>
              {PLANT_TYPES_DATA.map(type => {
                return (
                  <AccordionItem key={type}>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <b>{type}</b>
                        <AccordionIcon />
                      </Box>
                    </AccordionButton>
                    <AccordionPanel>
                      <PlantDetails species={type} age={undefined} />
                      <br />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {currUsername === username && (
                          <>
                            <Input
                              pr='2rem'
                              type={'text'}
                              placeholder='Enter plant name'
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setNewPlantName(event.target.value);
                              }}
                            />
                            <Spacer />
                            <GardenButton
                              label={'Plant Me!'}
                              color={'#C4A484'}
                              hoverColor={'#CCC5AD'}
                              onClick={() => plantSeed(type)}
                            />
                          </>
                        )}
                      </div>
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
