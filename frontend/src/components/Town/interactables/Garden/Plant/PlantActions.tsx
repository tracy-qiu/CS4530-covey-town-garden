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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';
import { GardenButton } from '../GardenButton';
import { useToast } from '@chakra-ui/react';
import useTownController from '../../../../../hooks/useTownController';

type PlantActionProps = {
  username: string;
  plant: Plant;
};
/**
 * Displays actions to perform on a selected plant, such as watering and removing. It also shows a plant's current health status
 * @param {Plant} plant
 * @returns {JSX.Element} component
 */
export default function PlantActions({ username, plant }: PlantActionProps): JSX.Element {
  const [statusColor, setStatusColor] = useState('');
  const [lastWateredTime, setLastWateredTime] = useState('');
  const [wateredDaysAgo, setWateredDaysAgo] = useState('');
  const today = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const toast = useToast();

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
  }, [plant]);

  useEffect(() => {
    const lastWateredTimeInMillis = new Date(lastWateredTime).getTime();
    const differenceInDays = Math.floor(
      (new Date().getTime() - lastWateredTimeInMillis) / (1000 * 60 * 60 * 24),
    );
    setWateredDaysAgo(differenceInDays.toString());
  }, [lastWateredTime]);

  const waterPlant = () => {
    // need to send lastWatered time to database and reset the object
    // plant.lastWatered = new Date();
    setLastWateredTime(today);
    toast({
      title: 'Watered ' + plant.name + ' (' + plant.species + ')!',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const removePlant = () => {
    toast({
      title: 'Removed ' + plant.name + ' (' + plant.species + ')!',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const isCurUserOwner = username === useTownController().ourPlayer.userName;

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
          <Badge
            colorScheme={
              plant.species === 'Blueberry'
                ? 'purple'
                : plant.species === 'Carrot'
                ? 'orange'
                : 'pink'
            }
            variant='solid'
            fontSize='0.9em'>
            Hello! My name is {plant.name}
          </Badge>
        </Center>
        <br />
        <Grid templateColumns='repeat(2, 1fr)' gap={1.5} marginLeft={'0.5em'} marginRight={'0.5em'}>
          <GridItem w='100%'>
            <b>Condition: </b>
            <Badge colorScheme={statusColor} variant='solid'>
              {plant.status}
            </Badge>
          </GridItem>
          <GridItem w='100%'>
            <b>Age: </b>
            <Badge colorScheme='teal' variant='solid'>
              {plant.age}
            </Badge>
          </GridItem>
          <GridItem w='100%'>
            <b>Current Date: </b>
            <Badge variant='outline'>{today}</Badge>
          </GridItem>
          <GridItem w='100%'>
            <b>Last Watered: </b>
            <Badge variant='outline'>{lastWateredTime}</Badge>
            <p>{wateredDaysAgo} days ago</p>
          </GridItem>
        </Grid>

        <br />
        <Box position='relative' padding='4'>
          <Divider />
          <AbsoluteCenter bg='#FFFEF6' px='4'>
            <b>Actions</b>
          </AbsoluteCenter>
        </Box>

        <Grid templateColumns='repeat(2, 1fr)' gap={0}>
          <GridItem display='flex' justifyContent='center' alignItems='center'>
            <GardenButton
              label={'Water me!'}
              color={'#77E5EC'}
              hoverColor={'#3EC4FE'}
              fn={waterPlant}
              disabled={!isCurUserOwner}
            />
          </GridItem>
          <GridItem display='flex' justifyContent='center' alignItems='center'>
            <GardenButton
              label={'Remove Plant'}
              color={'#F27459'}
              hoverColor={'#F34E4E'}
              fn={removePlant}
              disabled={!isCurUserOwner}
            />
          </GridItem>
        </Grid>
      </Container>
      <br />
      <br />
    </>
  );
}
