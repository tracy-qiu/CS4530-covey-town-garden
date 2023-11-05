import React from 'react';
import { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';
/**
 *
 * @returns
 */
export default function RemovePlant({plant}: {plant: Plant}): JSX.Element {
  const removePlant = (plantID : number) => {
    // async call to remove plant
  }

  return (
    <Accordion allowToggle>
        <AccordionItem>
          <Heading as='h3'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Remove Plant</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel>
             <Container>
              <Button colorScheme='red' onClick={() => removePlant(plant.id)}>Remove Plant</Button>
            </Container>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>


  );
}
