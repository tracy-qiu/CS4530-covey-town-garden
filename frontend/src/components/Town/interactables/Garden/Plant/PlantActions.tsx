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
import { GardenButton } from '../GardenButton';
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
  const waterPlant = (pid: number) => {
    //waterPlant
    alert('watered!');
  };

  const removePlant = (pid: number) => {
    alert('removed!');
  };

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
          {plant.lastWatered?.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </h2>
        <br />

        <Box position='relative' padding='4'>
          <Divider />
          <AbsoluteCenter bg='#FFFEF6' px='4'>
            <b>Actions</b>
          </AbsoluteCenter>
        </Box>
        <GardenButton
          label={'Water me!'}
          color={'#77E5EC'}
          hoverColor={'#3EC4FE'}
          fn={() => waterPlant(plant.pid)}
        />
        <br />
        <br />
        <GardenButton
          label={'Remove Plant'}
          color={'#F27459'}
          hoverColor={'#F34E4E'}
          fn={() => removePlant(plant.pid)}
        />
      </Container>
      <br />
    </>
  );
}
