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
  InputGroup,
  Input,
  InputRightElement,
} from '@chakra-ui/react';
import PlantDetails from './PlantDetails';
import { GardenButton } from '../GardenButton';
import { useToast } from '@chakra-ui/react';
import useTownController from '../../../../../hooks/useTownController';

type SeedManualProps = {
  isOpen: boolean;
  onClose: () => void;
  username: string;
};

export function SeedManual({ isOpen, onClose, username }: SeedManualProps): JSX.Element {
  const curUsername = useTownController().ourPlayer.userName;

  const toast = useToast();

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
        title: 'Planting ' + plantType,
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
              <AccordionItem>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    <b>Rose</b>
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
                <AccordionPanel>
                  <PlantDetails species={'Rose'} age={undefined} />
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <InputGroup size='md'>
                      <Input pr='2rem' type={'text'} placeholder='Enter plant name' />
                      <InputRightElement
                        width='6.5rem'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setNewPlantName(event.target.value);
                        }}>
                        <GardenButton
                          label={'Plant Me!'}
                          color={'#C4A484'}
                          hoverColor={'#CCC5AD'}
                          fn={() => plantSeed('Rose')}
                          disabled={curUsername !== username}
                        />
                      </InputRightElement>
                    </InputGroup>
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
                  <PlantDetails species={'Blueberry'} age={undefined} />
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <InputGroup size='md'>
                      <Input pr='2rem' type={'text'} placeholder='Enter plant name' />
                      <InputRightElement
                        width='6.5rem'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setNewPlantName(event.target.value);
                        }}>
                        <GardenButton
                          label={'Plant Me!'}
                          color={'#C4A484'}
                          hoverColor={'#CCC5AD'}
                          fn={() => plantSeed('Rose')}
                          disabled={curUsername !== username}
                        />
                      </InputRightElement>
                    </InputGroup>
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
                  <PlantDetails species={'Carrot'} age={undefined} />
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <InputGroup size='md'>
                      <Input pr='2rem' type={'text'} placeholder='Enter plant name' />
                      <InputRightElement
                        width='6.5rem'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setNewPlantName(event.target.value);
                        }}>
                        <GardenButton
                          label={'Plant Me!'}
                          color={'#C4A484'}
                          hoverColor={'#CCC5AD'}
                          fn={() => plantSeed('Rose')}
                          disabled={curUsername !== username}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Container>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}
