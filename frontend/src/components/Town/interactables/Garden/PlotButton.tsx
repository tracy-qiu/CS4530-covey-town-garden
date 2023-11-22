import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonProps, Text, Image, Spacer, VStack, chakra } from '@chakra-ui/react';
import PlantCare, { PlantCareProps } from './Plant/PlantCare';
import { Plant, PlantDetailsData, PlotPlant } from '../../../../types/CoveyTownSocket';
import { MyGarden } from './MyGarden';
import { SeedManual } from './Plant/SeedManual';

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: '0.7em',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderColor: '#EDD4B2',
    borderWidth: '2px',
    whiteSpace: 'normal',
    //bgColor: '#793D00',
    color: '#FFFEF6',
    height: '100px',
    width: '100px',
    minWidth: '100px',
    fontSize: '16px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#C4A484' },
  },
});

interface PlantPlotButtonProps extends ButtonProps {
  username: string;
  plotPlant: PlotPlant;
}

/**
 * Button representing a plant of the user's garden. Clicking will access the plant's details and actions.
 * @param {username, plotPlant} PlantPlotButtonProps username of the user and their list of plants
 * @returns { JSX.Element } plot button
 */
export function PlantPlotButton({
  children,
  username,
  plotPlant: { plant },
  ...rest
}: PlantPlotButtonProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <Box>
      {show && plant !== undefined ? (
        PlantCare(show, handleClose, { username: username, plant: plant })
      ) : (
        <SeedManual isOpen={show} onClose={handleClose} username={username} />
      )}
      {plant !== undefined ? (
        <StyledPlot onClick={handleClick} {...rest}>
          <VStack maxHeight='95%' maxWidth='95%' padding='2px' shouldWrapChildren={true}>
            <Text>{plant.name}</Text>
            <Image
              maxHeight='50px'
              maxWidth='50px'
              src={displayImg}
              alt={plant.species + ' age image in plot'}
            />
            <Spacer />
          </VStack>
        </StyledPlot>
      ) : (
        <StyledPlot onClick={handleClick} {...rest}>
          {'PLANT ME'}
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
