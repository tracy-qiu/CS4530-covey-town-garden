import React, { useEffect } from 'react';
import { useState } from 'react';
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
  Badge,
  Stack,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';

/**
 * Displays actions to perform on a selected plant, such as watering and removing. It also shows a plant's current health status
 * @returns JSX.Element
 */
export default function PlantActions({ plant }: { plant: Plant }): JSX.Element {
  const [statusColor, setStatusColor] = useState('');
  useEffect(() => {
    if (plant.status === 'Healthy') {
      setStatusColor('green');
    } else if (plant.status === 'Dehydrated') {
      setStatusColor('yellow');
    } else if (plant.status === 'About to Die') {
      setStatusColor('red');
    } else if (plant.status === 'Dead :C') {
      setStatusColor('purple');
    }
  }, [plant]);
  const waterPlant = (plantID: string) => {
    //waterPlant
  };

  const removePlant = (plantID: string) => {};
  return (
    <>
      <br />
      <Container>
        <b>Plant Health: </b>
        <Badge colorScheme={statusColor}>{plant.status}</Badge>
      </Container>
      <br />

      <Accordion allowToggle>
        <AccordionItem>
          <Heading as='h3'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Water Plant</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Container>
              <h2>Last watered: {plant.lastWateredTime}</h2>
              <Button colorScheme='blue' onClick={() => waterPlant(plant.id)}>
                Water me!
              </Button>
            </Container>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <Heading as='h3'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Remove Plant</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Container>
              <Button colorScheme='red' onClick={() => removePlant(plant.id)}>
                Remove Plant
              </Button>
            </Container>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
