import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Center,
  HStack,
  Spacer,
  Text,
  VStack,
  Image,
  chakra,
} from '@chakra-ui/react';
import PlantCare from './Plant/PlantCare';
import { PlantDetailsData, PlotPlant } from '../../../../types/CoveyTownSocket';
import { MyGarden } from './MyGarden';
import { SeedManual } from './Plant/SeedManual';
import useTownController from '../../../../hooks/useTownController';
import { PLANT_DETAILS_DATA } from './garden-data/data';

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: '0.7em',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderColor: '#EDD4B2',
    borderWidth: '2px',
    whiteSpace: 'normal',
    bgColor: '#6C3701',
    color: '#FFFEF6',
    minHeight: '120px',
    width: '100%',
    minWidth: '100px',
    fontSize: '16px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#985510' },
  },
});

interface PlantPlotButtonProps extends ButtonProps {
  username: string;
  plantNames: (string | undefined)[];
  plotPlant: PlotPlant;
}

/**
 * Button representing a plant of the user's garden. Clicking will access the plant's details and actions.
 * @param {username, plantNames, plotPlant} PlantPlotButtonProps username of the user, names of their plants, and the plant in this plot
 * @returns { JSX.Element } plot button
 */
export function PlantPlotButton({
  children,
  username,
  plantNames,
  plotPlant: { plant },
  ...rest
}: PlantPlotButtonProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const [displayImg, setDisplayImg] = useState('');
  const [statusBadge, setStatusBadge] = useState(<></>);

  useEffect(() => {
    if (plant !== undefined) {
      const plantInfo: PlantDetailsData | undefined =
        PLANT_DETAILS_DATA.find(info => info.type === plant.species) ?? undefined;
      if (plantInfo && plant !== undefined) {
        if (plant.status == 'Dead') {
          setDisplayImg(
            'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/820068/tombstone-clipart-md.png',
          );
        } else if (plant.age === 'Seedling') {
          setDisplayImg(plantInfo.seedImg);
        } else if (plant.age === 'Sprout') {
          setDisplayImg(plantInfo.sproutImg);
        } else if (plant.age === 'Adult') {
          setDisplayImg(plantInfo.matureImg);
        }
      }
    } else {
      setDisplayImg(
        'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/4056/sand-shovel-clipart-xl.png',
      );
    }

    const healthyBadge = (
      <Badge variant='solid' colorScheme={'green'} margin={'0.3em'}>
        {'Healthy'}
      </Badge>
    );

    const dehydratedBadge = (
      <Badge variant='solid' colorScheme={'yellow'} margin={'0.3em'}>
        {'Dehydrated'}
      </Badge>
    );

    const aboutToDieBadge = (
      <Badge variant='solid' colorScheme={'red'} margin={'0.3em'}>
        {'About to Die'}
      </Badge>
    );

    const deadBadge = (
      <Badge variant='solid' margin={'0.3em'}>
        {'Dead'}
      </Badge>
    );

    if (plant !== undefined) {
      switch (plant.status) {
        case 'Healthy':
          setStatusBadge(healthyBadge);
          break;
        case 'Dehydrated':
          setStatusBadge(dehydratedBadge);
          break;
        case 'About to Die':
          setStatusBadge(aboutToDieBadge);
          break;
        case 'Dead':
          setStatusBadge(deadBadge);
          break;
        default:
          break;
      }
    }
  }, [plant]);

  return (
    <Box>
      {show && plant !== undefined ? (
        PlantCare(show, handleClose, { username: username, plant: plant })
      ) : (
        <SeedManual
          isOpen={show}
          onClose={handleClose}
          username={username}
          plantNames={plantNames}
        />
      )}
      {plant !== undefined ? (
        <StyledPlot onClick={handleClick} {...rest}>
          <VStack paddingBottom={2} paddingTop={2}>
            <Spacer />
            <Text>{plant.name}</Text>
            <Image
              maxHeight='50px'
              maxWidth='50px'
              src={displayImg}
              alt={'life cycle image of plant'}
            />
            {statusBadge}
            <Spacer />
          </VStack>
        </StyledPlot>
      ) : (
        <StyledPlot onClick={handleClick} {...rest}>
          <VStack maxHeight='95%' maxWidth='95%' shouldWrapChildren={true}>
            <Text>{'Plant me!'}</Text>
            <Center>
              <Image maxHeight='50px' maxWidth='50px' src={displayImg} alt={'plant here'} />
            </Center>
            <Spacer />
          </VStack>
        </StyledPlot>
      )}
    </Box>
  );
}

interface GardenPlotButtonProps extends ButtonProps {
  username: string;
  plants: PlotPlant[];
}

/**
 * Button representing a user's plot of the community garden. Clicking will access their personal garden plot.
 * @param { string, PlotPlant[] } GardenPlotButtonProps username of the user and their list of plants
 * @returns { JSX.Element } plot button
 */

export function GardenPlotButton({
  children,
  username,
  plants,
  ...rest
}: GardenPlotButtonProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const currUsername = useTownController().ourPlayer.userName;

  return (
    <Box>
      {show &&
        MyGarden(username, {
          isOpen: show,
          onClose: handleClose,
          plants: plants,
        })}
      <StyledPlot
        bgColor={currUsername === username ? '#65B891' : undefined}
        bgImage={
          currUsername !== username
            ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_L2aMkVO--A_GOxD08fP9FygAX8rEBDnPWw&usqp=CAU'
            : undefined
        }
        onClick={handleClick}
        {...rest}>
        {currUsername === username ? username + ' (Me)' : username}
      </StyledPlot>
    </Box>
  );
}
