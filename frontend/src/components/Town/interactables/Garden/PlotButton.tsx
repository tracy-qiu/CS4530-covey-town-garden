import React, { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  ButtonProps,
  Center,
  Spacer,
  Text,
  VStack,
  Image,
  chakra,
  HStack,
  Circle,
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
    height: '100%',
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
 * It will display the plant's name, an image corresponding to the plant's lifecycle stage, and its status.
 * If there is no plant, there will be a "Plant me" prompt and shovel image.
 * @param {username, plantNames, plotPlant} PlantPlotButtonProps username of the user and their list of plants
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
  const [statusIcon, setStatusIcon] = useState(<></>);

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

    const dehydratedColor = '#ECC94B';
    const aboutToDieColor = '#E53E3E';

    const healthyIcon = <Circle size='20px' bg='green' borderColor='white' borderWidth={1} />;

    const dehydratedIcon = (
      <Circle size='20px' bg={dehydratedColor} borderColor='white' borderWidth={1} />
    );

    const aboutToDieIcon = (
      <Circle size='20px' bg={aboutToDieColor} borderColor='white' borderWidth={1} />
    );

    const deadIcon = <Circle size='20px' bg='gray' borderColor='white' borderWidth={1} />;

    const emptyIcon = <Circle size='20px' />;

    if (plant !== undefined) {
      switch (plant.status) {
        case 'Healthy':
          setStatusIcon(healthyIcon);
          break;
        case 'Dehydrated':
          setStatusIcon(dehydratedIcon);
          break;
        case 'About to Die':
          setStatusIcon(aboutToDieIcon);
          break;
        case 'Dead':
          setStatusIcon(deadIcon);
          break;
        default:
          break;
      }
    } else {
      setStatusIcon(emptyIcon);
    }
  }, [plant]);

  return (
    <StyledPlot onClick={handleClick} {...rest}>
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
      <VStack width='full' height='95%' paddingTop={2} paddingBottom={4} spacing='-3'>
        <HStack width='full' align='self-end'>
          <Spacer />
          {statusIcon}
        </HStack>
        <VStack spacing={4}>
          <Text flexWrap={'wrap'}>{plant !== undefined ? plant.name : 'Plant me!'}</Text>
          <Image
            maxHeight='50px'
            maxWidth='50px'
            src={displayImg}
            alt={'life cycle image of plant or shovel if no plant'}
          />
        </VStack>
      </VStack>
    </StyledPlot>
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
