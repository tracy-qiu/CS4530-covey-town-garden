import React, { useEffect, useState } from 'react';
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
import { Plant, PlantDetailsData } from '../../../../../types/CoveyTownSocket';
import PLANT_DETAILS_DATA from '../garden-data/data';

/**
 * Displays information about a given plant
 * @returns JSX Element
 */
export default function PlantDetails({ plant }: { plant: Plant }): JSX.Element {
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [aboutImg, setAboutImg] = useState('');
  const [seedImg, setSeedImg] = useState('');
  const [sproutImg, setSproutImg] = useState('');
  const [plantImg, setPlantImg] = useState('');

  useEffect(() => {
    const plantInfo: PlantDetailsData | undefined =
      PLANT_DETAILS_DATA.find(info => info.type === plant.species) ?? undefined;
    if (plantInfo) {
      setAbout(plantInfo.about);
      setInstructions(plantInfo.instructions);
      setAboutImg(plantInfo.aboutImg);
      setSeedImg(plantInfo.seedImg);
      setSproutImg(plantInfo.sproutImg);
      setPlantImg(plantInfo.matureImg);
    }
  }, [plant.species]);
  return (
    <>
      <Box position='relative' padding='4'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          <b>{plant.species}</b>
        </AbsoluteCenter>
      </Box>
      <Container>
        <Grid templateColumns='1fr 2fr' gap={3}>
          <GridItem w='100%' h='40' display='flex'>
            <Image src={aboutImg} alt={plant.species + ' about image'} />
          </GridItem>
          <GridItem w='100%' h='40' display='flex'>
            <p>{about}</p>
          </GridItem>
        </Grid>
        <br />
        <Heading as='h5' size='sm'>
          Care Instructions
        </Heading>
        <p>{instructions}</p>
        <br />
        <Heading as='h5' size='sm'>
          Life Cycle
        </Heading>
        <Grid templateColumns='1fr 1fr 1fr' gap={1}>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={seedImg} alt={plant.species + ' seed image'} />
          </GridItem>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={sproutImg} alt={plant.species + ' sprout image'} />
          </GridItem>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={plantImg} alt={plant.species + ' mature image'} />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
