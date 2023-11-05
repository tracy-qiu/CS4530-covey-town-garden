import React, { useEffect, useState } from 'react';
import Rose from '../Images/rose.png';
import {
  AbsoluteCenter,
  Divider,
  Image,
  Box,
  Grid,
  GridItem,
  Container,
  Heading,
} from '@chakra-ui/react';
import { Plant } from '../../../../../types/CoveyTownSocket';
/**
 *
 * @returns
 */
export default function PlantDetails({plant}: {plant: Plant}): JSX.Element {
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [plantImg, setPlantImg] = useState()
  useEffect(() => {
    if (plant.plantType === 'Rose') {
      setAbout('A rose is...')
      setInstructions('How to tend a rose...');
      setPlantImg(Rose)
    }
  }, [])
  return (
    <>
      <Box position='relative' padding='4'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          <b>{plant.plantType}</b>
        </AbsoluteCenter>
      </Box>
      <Container>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GridItem w='100%' h='20' >
            <Image src={plantImg} alt={plant.plantType + 'image'}/>
          </GridItem>
          <GridItem w='100%' h='20'>
            <p>{about}</p>
          </GridItem>
        </Grid>
        <Heading as='h5' size='sm'>Care Instructions</Heading>
        <p>{instructions}</p>
        <br />
        <Heading as='h5' size='sm'>Life Cycle</Heading>
      </Container>
    </>
  );
}
