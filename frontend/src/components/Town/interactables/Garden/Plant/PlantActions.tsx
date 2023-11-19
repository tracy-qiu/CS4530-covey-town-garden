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
  Badge,
  Divider,
  AbsoluteCenter,
  Heading,
  Tag,
  Center,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';
/**
 * Displays actions to perform on a selected plant, such as watering and removing. It also shows a plant's current health status
 * @param {Plant} plant
 * @returns {JSX.Element} component
 */
export default function PlantActions({ plant }: { plant: Plant }): JSX.Element {
  const [statusColor, setStatusColor] = useState('');
  const [ageColor, setAgeColor] = useState('');
  useEffect(() => {
    if (plant.status === 'Healthy') {
      setStatusColor('green');
    } else if (plant.status === 'Dehydrated') {
      setStatusColor('yellow');
    } else if (plant.status === 'About to Die') {
      setStatusColor('red');
    } else if (plant.status === 'Dead') {
      setStatusColor('gray');
    }

    if (plant.status !== 'Dead') {
      if (plant.age === 'Adult') {
        setAgeColor('purple');
      } else if (plant.age === 'Sprout') {
        setAgeColor('pink');
      } else {
        setAgeColor('teal');
      }
    }
  }, [plant]);
  const waterPlant = (pid: string) => {
    //waterPlant
  };

  const removePlant = (pid: string) => {};

  return (
    <>
      <Container>
        <Box position='relative' padding='4'>
          <Divider />
          <AbsoluteCenter bg='#FFFEF6' px='4'>
            <b>Plant Status</b>
          </AbsoluteCenter>
        </Box>
        <Center>
          <Tag>Hello! My name is {plant.name}</Tag>
        </Center>
        <h1>
          <b>Condition: </b>
          <Badge colorScheme={statusColor}>{plant.status}</Badge>
        </h1>
        <h2>
          <b>Age: </b>
          <Badge colorScheme={ageColor}>{plant.age}</Badge>
        </h2>
        <h2>
          <b>Current Date: </b>
          {new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </h2>
        <h2>
          <b>Last watered: </b>
          {plant.lastWatered.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </h2>
      </Container>
      <br />

      <Accordion allowToggle>
        <AccordionItem>
          <Heading as='h3'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Actions</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <Button colorScheme='blue' onClick={() => waterPlant(plant.pid)}>
              Water me!
            </Button>
            <br />
            <br />
            <Button colorScheme='red' onClick={() => removePlant(plant.pid)}>
              Remove Plant
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br />
    </>
  );
}
