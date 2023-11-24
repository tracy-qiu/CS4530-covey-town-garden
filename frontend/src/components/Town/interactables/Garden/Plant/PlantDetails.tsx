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
import { PlantDetailsData, Plant, PlantType, PlantAge } from '../../../../../types/CoveyTownSocket';
import PLANT_DETAILS_DATA from '../garden-data/data';

type PlantDetailsProp = {
  species: PlantType;
  age?: PlantAge | undefined;
};

/**
 * Displays information about a given plant
 * @param {Plant} plant
 * @returns {JSX.Element} component
 */
export default function PlantDetails({ species, age }: PlantDetailsProp): JSX.Element {
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [aboutImg, setAboutImg] = useState('');
  const [seedImg, setSeedImg] = useState('');
  const [sproutImg, setSproutImg] = useState('');
  const [plantImg, setPlantImg] = useState('');

  useEffect(() => {
    const plantInfo: PlantDetailsData | undefined =
      PLANT_DETAILS_DATA.find(info => info.type === species) ?? undefined;
    if (plantInfo) {
      setAbout(plantInfo.about);
      setInstructions(plantInfo.instructions);
      setAboutImg(plantInfo.aboutImg);
      setSeedImg(plantInfo.seedImg);
      setSproutImg(plantInfo.sproutImg);
      setPlantImg(plantInfo.matureImg);
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
        <Grid templateColumns='1fr 2fr' gap={3}>
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
          <GridItem w='100%' h='20' display='flex' justifyContent={'center'}>
            <Image src={seedImg} alt={species + ' seed image'} />
          </GridItem>
          <GridItem w='100%' h='20' display='flex' justifyContent={'center'}>
            <Image src={sproutImg} alt={species + ' sprout image'} />
          </GridItem>
          <GridItem w='100%' h='20' display='flex' justifyContent={'center'}>
            <Image src={plantImg} alt={species + ' mature image'} />
          </GridItem>
        </Grid>
        <Grid templateColumns='1fr 1fr 1fr' gap={1}>
          <GridItem w='100%' display='flex' justifyContent={'center'}>
            <Badge variant={age === 'Seedling' ? 'solid' : 'outline'} colorScheme='teal'>
              Seedling
            </Badge>
          </GridItem>
          <GridItem w='100%' display='flex' justifyContent={'center'}>
            <Badge variant={age === 'Sprout' ? 'solid' : 'outline'} colorScheme={'teal'}>
              Sprout
            </Badge>
          </GridItem>
          <GridItem w='100%' display='flex' justifyContent={'center'}>
            <Badge variant={age === 'Adult' ? 'solid' : 'outline'} colorScheme={'teal'}>
              Adult
            </Badge>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
