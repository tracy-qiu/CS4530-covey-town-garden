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
  Badge,
} from '@chakra-ui/react';
import { PlantDetailsData, PlantType, PlantAge } from '../../../../../types/CoveyTownSocket';
import { PLANT_DETAILS_DATA, PLANT_AGES_DATA } from '../garden-data/data';

type PlantDetailsProp = {
  species: PlantType;
  age?: PlantAge | undefined;
};

/**
 * Displays information (gardening instructions, image, and life cycle) about a given plant
 * @param { species, age } PlantDetailsProp species and age of plant
 * @returns {JSX.Element} component
 */
export default function PlantDetails({ species, age }: PlantDetailsProp): JSX.Element {
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [aboutImg, setAboutImg] = useState('');
  const [lifeCycleImgs, setLifeCycleImgs] = useState<string[]>([]);

  // gets data about the plant species
  useEffect(() => {
    const plantInfo: PlantDetailsData | undefined =
      PLANT_DETAILS_DATA.find(info => info.type === species) ?? undefined;
    if (plantInfo) {
      setAbout(plantInfo.about);
      setInstructions(plantInfo.instructions);
      setAboutImg(plantInfo.aboutImg);
      setLifeCycleImgs([plantInfo.seedImg, plantInfo.sproutImg, plantInfo.matureImg]);
    }
  }, [species]);

  return (
    <>
      <Box position='relative' padding='4'>
        <Divider />
        <AbsoluteCenter bg='#FFFEF6' px='4'>
          <b>{species}</b>
        </AbsoluteCenter>
      </Box>
      <Container>
        <Grid templateColumns='1fr 2fr' gap={0}>
          <GridItem w='100%' h='40' display='flex'>
            <Image src={aboutImg} alt={species + ' about image'} />
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
          {lifeCycleImgs.map((image, index) => (
            <GridItem key={image} w='100%' h='20' display='flex' justifyContent={'center'}>
              <Image src={image} alt={species + ' image' + index} />
            </GridItem>
          ))}
        </Grid>
        <Grid templateColumns='1fr 1fr 1fr' gap={1}>
          {PLANT_AGES_DATA.map(plantAge => (
            <GridItem key={plantAge} w='100%' display='flex' justifyContent={'center'}>
              <Badge variant={age === plantAge ? 'solid' : 'outline'} colorScheme='teal'>
                {plantAge}
              </Badge>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  );
}
