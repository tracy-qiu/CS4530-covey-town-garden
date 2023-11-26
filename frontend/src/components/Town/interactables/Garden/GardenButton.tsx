import React from 'react';
import { Button } from '@chakra-ui/react';
import { ButtonProps } from '@material-ui/core';

// TO FILL OUT -> for use on main garden screen, could be used for returning
// to main garden from my garden

interface GardenButtonProps extends Omit<ButtonProps, 'color'> {
  label: string;
  color: string;
  hoverColor: string;
}

/**
 * Reusable button component that will take in a function and color.
 * @param {label, color, hoverColor, onClick, disabled} GardenButtonProps button properties
 * @returns {JSX.Element} GardenButton
 */

export function GardenButton({ label, color, hoverColor }: GardenButtonProps): JSX.Element {
  return (
    <Button color={'black'} bgColor={color} _hover={{ backgroundColor: hoverColor }}>
      {label}
    </Button>
  );
}
