import React, { useState } from 'react';
import { Box, Button, ButtonProps, chakra } from '@chakra-ui/react';
import PlantCare, { PlantCareProps } from './Plant/PlantCare';
import { Plant } from '../../../../types/CoveyTownSocket';
import { MyGarden } from './MyGarden';

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderColor: '#EDD4B2',
    borderWidth: '2px',
    bgColor: '#793D00',
    height: '100%',
    width: '100%',
    fontSize: '20px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#C4A484' },
  },
});

interface PlantPlotButtonProps extends ButtonProps {
  plantCareProps: PlantCareProps;
}

/**
 * Button representing a plant of the user's garden. Clicking will
 * access the plant's details and actions.
 * @param { PlantCareProps } username of the user and their list of plants
 * @returns { JSX.Element } plot button
 */

export function PlantPlotButton({
  children,
  plantCareProps,
  ...rest
}: PlantPlotButtonProps): JSX.Element {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true);
  };

  return (
    <Box>
      {show && (
        <PlantCare
          plant={plantCareProps.plant}
          showActions={plantCareProps.showActions}
          key='sample'></PlantCare>
      )}
      <StyledPlot onClick={handleClick} {...rest}></StyledPlot>
    </Box>
  );
}

interface GardenPlotButtonProps extends ButtonProps {
  username: string;
  plants: Plant[];
}

/**
 * Button representing a user's plot of the community garden. Clicking will
 * access their personal garden plot.
 * @param { string, Plant[] } username of the user and their list of plants
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

  return (
    <Box>
      {show &&
        MyGarden(username, {
          isOpen: show,
          onClose: handleClose,
          plants: [
            [plants[0], plants[1]],
            [plants[2], plants[3]],
          ],
        })}
      <StyledPlot onClick={handleClick} {...rest}>
        {username}
      </StyledPlot>
    </Box>
  );
}
