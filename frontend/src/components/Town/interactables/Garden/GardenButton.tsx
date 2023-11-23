import React from 'react';
import { Button } from '@chakra-ui/react';

// TO FILL OUT -> for use on main garden screen, could be used for returning
// to main garden from my garden

export type GardenButtonProps = {
  textColor: string;
  label: string;
  color: string;
  hoverColor: string;
  onClick: any;
  disabled?: boolean;
};

/**
 * Reusable button component that will take in a function and color.
 * @param {label, color, hoverColor, onClick, disabled} GardenButtonProps button properties
 * @returns {JSX.Element} GardenButton
 */

export function GardenButton({
  textColor,
  label,
  color,
  hoverColor,
  onClick,
  disabled,
}: GardenButtonProps): JSX.Element {
  return (
    <Button
      color={textColor}
      bgColor={color}
      _hover={{ backgroundColor: hoverColor }}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </Button>
  );
}
