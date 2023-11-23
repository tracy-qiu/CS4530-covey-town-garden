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

export type ButtonType = 'MyGarden' | 'PlantMe' | 'Water' | 'Remove';

function buttonTextColor(type: ButtonType): string {
  const myGardenTextColor = '#395941';
  const plantMeTextColor = '#6C3701';
  const waterTextColor = '#002994';
  const removeTextColor = '#8A0606';

  switch (type) {
    case 'MyGarden':
      return myGardenTextColor;
    case 'PlantMe':
      return plantMeTextColor;
    case 'Water':
      return waterTextColor;
    case 'Remove':
      return removeTextColor;
  }
}

function buttonBackgroundColor(type: ButtonType): string {
  const myGardenBackgroundColor = '#7ED191';
  const plantMeBackgroundColor = '#CBAC82';
  const waterBackgroundColor = '#77E5EC';
  const removeBackgroundColor = '#FD8971';

  switch (type) {
    case 'MyGarden':
      return myGardenBackgroundColor;
    case 'PlantMe':
      return plantMeBackgroundColor;
    case 'Water':
      return waterBackgroundColor;
    case 'Remove':
      return removeBackgroundColor;
  }
}

function buttonHoverColor(type: ButtonType): string {
  const myGardenHoverColor = '#87E752';
  const plantMeHoverColor = '#EDD4B2';
  const waterHoverColor = '#3EC4FE';
  const removeHoverColor = '#F34E4E';

  switch (type) {
    case 'MyGarden':
      return myGardenHoverColor;
    case 'PlantMe':
      return plantMeHoverColor;
    case 'Water':
      return waterHoverColor;
    case 'Remove':
      return removeHoverColor;
  }
}

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
