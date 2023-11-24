import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Container,
  Badge,
  Divider,
  AbsoluteCenter,
  Center,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  HStack,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';
import { GardenButton } from '../GardenButton';
import { useToast } from '@chakra-ui/react';

type PlantActionProps = {
  plant: Plant;
};

/**
 * Displays plant status and information. It also includes actions to perform, such as watering and removing.
 * @param {Plant} plant
 * @returns {JSX.Element} component
 */
export default function PlantActions({ plant }: PlantActionProps): JSX.Element {
  const toast = useToast();
  const [statusColor, setStatusColor] = useState('');
  const [lastWateredTime, setLastWateredTime] = useState('');
  const [wateredDaysAgo, setWateredDaysAgo] = useState('');
  const today = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const toastMsg = (title: string) => {
    toast({
      title,
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  };

  const waterPlant = () => {
    // need to send lastWatered time to database and reset the object
    // plant.lastWatered = new Date();
    setLastWateredTime(today);
    toastMsg('Watered ' + plant.name + ' (' + plant.species + ')!');
  };

  const removePlant = () => {
    toastMsg('Removed ' + plant.name + ' (' + plant.species + ')!');
  };

  // decides colors to display for status
  const [ageColor, setAgeColor] = useState('');
  const [showWater, setShowWater] = useState(true);

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
    } else {
      setShowWater(false);
    }
  }, [plant]);

  // finds the difference in days from the last time the plant was watered until today
  useEffect(() => {
    const lastWateredTimeInMillis = new Date(lastWateredTime).getTime();
    const differenceInDays = Math.floor(
      (new Date().getTime() - lastWateredTimeInMillis) / (1000 * 60 * 60 * 24),
    );
    setWateredDaysAgo(differenceInDays.toString());
  }, [lastWateredTime]);

  return (
    <Container>
      <Box position='relative' padding='4'>
        <Divider />
        <AbsoluteCenter bg='#FFFEF6' px='4'>
          <b>Plant Status</b>
        </AbsoluteCenter>
      </Box>
      <Center marginTop={'0.4em'}>
        <Tag
          size='lg'
          colorScheme={
            plant.species === 'Blueberry'
              ? 'purple'
              : plant.species === 'Carrot'
              ? 'orange'
              : 'pink'
          }
          variant='solid'
          borderRadius='full'
          fontSize='0.9em'>
          <TagLabel>Hello! My name is {plant.name}</TagLabel>
        </Tag>
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
      <HStack spacing={20} justifyContent='center' alignItems='center'>
        {showWater && (
          <GardenButton label={'Water me!'} type='Water' fn={() => waterPlant(plant.pid)} />
        )}
        <GardenButton label={'Remove Plant'} type='Remove' fn={() => removePlant(plant.pid)} />
      </HStack>
    </Container>
  );
}
