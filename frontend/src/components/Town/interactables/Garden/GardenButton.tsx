import React from 'react';
import { Button } from '@chakra-ui/react';

// TO FILL OUT -> for use on main garden screen, could be used for returning
// to main garden from my garden

export type GardenButtonProps = {
  label: string;
  type: ButtonType;
  onClick: any;
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
 * Reusable button component that will take in a label, type, and function. The type
 * of button will decide the styling of the text color, background color, and hover color.
 * @param {label, type, onClick} GardenButtonProps button properties
 * @returns {JSX.Element} GardenButton
 */

export function GardenButton({ label, type, onClick }: GardenButtonProps): JSX.Element {
  return (
    <Button
      color={buttonTextColor(type)}
      bgColor={buttonBackgroundColor(type)}
      _hover={{ backgroundColor: buttonHoverColor(type) }}
      onClick={onClick}>
      {label}
    </Button>
  );
}