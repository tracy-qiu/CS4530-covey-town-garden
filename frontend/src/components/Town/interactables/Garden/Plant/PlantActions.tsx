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
} from '@chakra-ui/react';
import { Plant, PlantHealthStatus } from '../../../../../../../shared/types/garden-types/plant';

/**
 * Displays actions to perform on a selected plant, such as watering and removing. It also shows a plant's current health status
 * @returns JSX.Element
 */
export default function PlantActions({ plant }: { plant: Plant }): JSX.Element {
  const [statusColor, setStatusColor] = useState('');
  useEffect(() => {
    if (plant.status === PlantHealthStatus.Healthy) {
      setStatusColor('green');
    } else if (plant.status === PlantHealthStatus.Dehydrated) {
      setStatusColor('yellow');
    } else if (plant.status === PlantHealthStatus.AboutToDie) {
      setStatusColor('red');
    } else if (plant.status === PlantHealthStatus.Dead) {
      setStatusColor('purple');
    }
  }, [plant]);
  const waterPlant = (pid: string) => {
    //waterPlant
  };

  const removePlant = (pid: string) => {};
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
              <h2>Last watered: {plant.lastWatered}</h2>
              <Button colorScheme='blue' onClick={() => waterPlant(plant.pid)}>
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
              <Button colorScheme='red' onClick={() => removePlant(plant.pid)}>
                Remove Plant
              </Button>
            </Container>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
