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
import { gardenApiClient } from '../../../../../classes/garden-client';

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
  const initialWaterTime = plant.lastWatered ? plant.lastWatered.toLocaleString() : '';
  const [lastWateredTime, setLastWateredTime] = useState(initialWaterTime);
  const [daysSinceLastWater, setDaysSinceLastWater] = useState(0);
  const [display, setDisplay] = useState(true);
  const today = new Date();

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
    gardenApiClient.updatePlantWatered({ plantId: plant._id }).catch(error => {
      toastMsg(error, 'error');
    });
    setLastWateredTime(new Date().toLocaleString());
    toastMsg('Watered ' + plant.name + ' (' + plant.species + ')!', 'success');

    // set health status and age based on watering
    if (plant.status === 'Healthy') {
      if (plant.age === 'Seedling') {
        gardenApiClient.updatePlantAge({ plantId: plant._id, plantAge: 'Sprout' }).catch(error => {
          toastMsg(error, 'error');
        });
        toastMsg('Plant is now a Sprout', 'info');
      } else if (plant.age === 'Sprout') {
        gardenApiClient.updatePlantAge({ plantId: plant._id, plantAge: 'Adult' }).catch(error => {
          toastMsg(error, 'error');
        });
        toastMsg('Plant is now an Adult', 'info');
      }
      // if it is an adult, do nothing
    }
    if (plant.status === 'Dehydrated') {
      gardenApiClient
        .updatePlantStatus({ plantId: plant._id, plantStatus: 'Healthy' })
        .catch(error => {
          toastMsg(error, 'error');
        });
      toastMsg('Plant is now Healthy', 'info');
    }
    if (plant.status === 'About to Die') {
      gardenApiClient
        .updatePlantStatus({ plantId: plant._id, plantStatus: 'Healthy' })
        .catch(error => {
          toastMsg(error, 'error');
        });
      toastMsg('Plant is now Healthy', 'info');
    }
  };

  const removePlant = () => {
    gardenApiClient.deletePlant(plant._id).catch(error => {
      toastMsg(error, 'error');
    });
    toastMsg('Removed ' + plant.name + ' (' + plant.species + ')!', 'success');
    // hides the plant action section if the plant is removed
    setDisplay(false);
  };

  // decides colors to display for status
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

    if (plant.status === 'Dead') {
      setShowWater(false);
    }
  }, [plant]);

  // finds the difference in days from the last time the plant was watered until today
  useEffect(() => {
    const lastWateredTimeInMillis = new Date(lastWateredTime).getTime();
    const differenceInDays = Math.floor(
      (new Date().getTime() - lastWateredTimeInMillis) / (1000 * 60 * 60 * 24),
    );
    setDaysSinceLastWater(differenceInDays);

    // set status to dehydrated if it's been 1 day
    if (daysSinceLastWater == 1) {
      gardenApiClient
        .updatePlantStatus({ plantId: plant._id, plantStatus: 'Dehydrated' })
        .catch(error => {
          toastMsg(error, 'error');
        });
    }
    // set status to about to die if it's been 2 days
    if (daysSinceLastWater >= 2) {
      gardenApiClient
        .updatePlantStatus({ plantId: plant._id, plantStatus: 'About to Die' })
        .catch(error => {
          toastMsg(error, 'error');
        });
    }
    // set status to about to die if it's been 3 days
    if (daysSinceLastWater >= 3) {
      gardenApiClient
        .updatePlantStatus({ plantId: plant._id, plantStatus: 'Dead' })
        .catch(error => {
          toastMsg(error, 'error');
        });
    }
  }, [daysSinceLastWater, lastWateredTime, plant._id, plant.name, plant.species, toastMsg]);

  return (
    <Container>
      {display && (
        <>
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
          <Grid
            templateColumns='repeat(2, 1fr)'
            gap={1.5}
            marginLeft={'0.5em'}
            marginRight={'0.5em'}>
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
              <Badge variant='outline'>
                {today.toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </Badge>
            </GridItem>
            <GridItem w='100%'>
              <b>Last Watered: </b>
              <Badge variant='outline'>{new Date(lastWateredTime).toLocaleString()}</Badge>
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
            {showWater && (
              <GardenButton label={'Water Me!'} type='Water' onClick={() => waterPlant()} />
            )}
            <GardenButton label={'Remove Plant'} type='Remove' onClick={() => removePlant()} />
          </HStack>
        </>
      )}
    </Container>
  );
}
