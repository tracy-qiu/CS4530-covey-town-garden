import React from 'react';
import { Button, chakra } from '@chakra-ui/react';

// TO FILL OUT -> for use on main garden screen, could be used for returning
// to main garden from my garden

export type GardenButtonProps = {
  label: string;
  color: string;
  hoverColor: string;
  fn: any;
};

/**
 * Reusable button component that will take in a function and color.
 * @returns {JSX.Element} GardenButton
 */

export function GardenButton({ label, color, hoverColor, fn }: GardenButtonProps): JSX.Element {
  return (
    <Button color={'black'} bgColor={color} _hover={{ backgroundColor: hoverColor }} onClick={fn}>
      {label}
    </Button>
  );
}
