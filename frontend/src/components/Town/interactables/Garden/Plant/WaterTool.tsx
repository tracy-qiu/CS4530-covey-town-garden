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
export default function WaterTool({plant}: {plant: Plant}): JSX.Element {
  const waterPlant = (plantID : number) => {
    //waterPlant
  }
  return (
    <Accordion allowToggle>
        <AccordionItem>
          <Heading as='h3'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <b>Watering Status</b>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel>
             <Container>
              <h2>Last watered: {plant.lastWateredTime}</h2>
              <Button colorScheme='blue' onClick={() => waterPlant(plant.id)}>Water me!</Button>
            </Container>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

  );
}
