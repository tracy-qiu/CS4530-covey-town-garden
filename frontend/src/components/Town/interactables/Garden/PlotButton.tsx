import React, { useState } from 'react';
import { Button, chakra } from '@chakra-ui/react';

const StyledPlot = chakra(Button, {
  baseStyle: {
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '25%',
    borderColor: '#EDD4B2',
    borderWidth: '2px',
    bgColor: '#793D00',
    height: '25%',
    width: '25%',
    fontSize: '50px',
    _disabled: {
      opacity: '100%',
    },
    _hover: { backgroundColor: '#C4A484' },
  },
});

export default function PlotButton(element: () => JSX.Element): JSX.Element {
  const [show, setShow] = useState(false);
  // add element here into function body
  // on Click adds or makes visible the element maybe need to use overlay? so styled plot stays
  return <StyledPlot onClick={setShow(true}></StyledPlot>;
}
