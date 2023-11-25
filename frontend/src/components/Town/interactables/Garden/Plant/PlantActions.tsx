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
  Spacer,
  VStack,
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
  const [daysSinceLastWater, setDaysSinceLastWater] = useState(0);
  const today = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

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

  const waterPlant = () => {
    // need to send lastWatered time to database and reset the object
    // plant.lastWatered = new Date();
    setLastWateredTime(today);
    toastMsg('Watered ' + plant.name + ' (' + plant.species + ')!', 'success');
  };

  const removePlant = () => {
    toastMsg('Removed ' + plant.name + ' (' + plant.species + ')!', 'success');
  };

  // decides colors to display for status
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

  // finds the difference in days from the last time the plant was watered until today
  useEffect(() => {
    const lastWateredTimeInMillis = new Date(lastWateredTime).getTime();
    const differenceInDays = Math.floor(
      (new Date().getTime() - lastWateredTimeInMillis) / (1000 * 60 * 60 * 24),
    );
    setDaysSinceLastWater(differenceInDays);

    // TBD: will call backend to reset the plant's status -> which will automatically update the frontend look
    // these toasts are just placeholders
    // we will remove these toast messagees later because they should be called in the community garden area

    // set status to dehydrated if it's been 1 day
    if (daysSinceLastWater == 1) {
      toastMsg(plant.name + ' (' + plant.species + ') is dehydrated! Please add water!', 'warning');
    }
    // set status to about to die if it's been 2 days
    if (daysSinceLastWater >= 2) {
      toastMsg(
        plant.name + ' (' + plant.species + ') is about to die! Please add water asap!',
        'error',
      );
    }
    // set status to about to die if it's been 3 days
    if (daysSinceLastWater >= 3) {
      toastMsg(plant.name + ' (' + plant.species + ') is dead! Please remove!', 'error');
    }
  }, [daysSinceLastWater, lastWateredTime, plant.name, plant.species, toastMsg]);

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
          <p>{daysSinceLastWater} days ago</p>
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
        <GardenButton
          label={'Water Me!'}
          color={'#77E5EC'}
          hoverColor={'#3EC4FE'}
          onClick={waterPlant}
        />
        <GardenButton
          label={'Remove Plant'}
          color={'#F27459'}
          hoverColor={'#F34E4E'}
          onClick={removePlant}
        />
      </HStack>
    </Container>
  );
}
