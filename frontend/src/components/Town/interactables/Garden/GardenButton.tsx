import React from 'react';
import { Button, chakra } from '@chakra-ui/react';

// TO FILL OUT -> for use on main garden screen, could be used for returning
// to main garden from my garden

const StyledButton = chakra(Button, {
  baseStyle: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderWidth: '2px',
    bgColor: '#7ED191',
    color: '#395941',
    height: '25%',
    width: '25%',
    fontSize: '50px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#7ED191' },
  },
});

export type GardenButtonProps = {
  color: string;
};

/**
 * Reusable button component that will take in a function and color.
 * @returns {JSX.Element} GardenButton
 */

export function GardenButton(label: string, { color }: GardenButtonProps): JSX.Element {
  return <StyledButton backgroundColor={color}>label</StyledButton>;
}
