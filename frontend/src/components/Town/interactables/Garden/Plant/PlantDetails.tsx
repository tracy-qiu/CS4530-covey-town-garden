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
  const [aboutImg, setAboutImg] = useState('')
  const [seedImg, setSeedImg] = useState('')
  const [sproutImg, setSproutImg] = useState('')
  const [plantImg, setPlantImg] = useState('')

  useEffect(() => {
    if (plant.plantType === 'Rose') {
      setAbout('Roses have been symbols of love and beauty for centuries. Red roses traditionally represent love and passion, while white roses symbolize purity and innocence.')
      setInstructions('To tend a rose, add water once a day');
      setAboutImg('https://img.freepik.com/free-photo/beautiful-rose-studio_23-2150737335.jpg')
      setSeedImg('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/28541/tj-openclipart-16-seed-germinating-20-2-16-clipart-md.png');
      setSproutImg('https://static.vecteezy.com/system/resources/previews/023/258/444/original/sprout-graphic-clipart-design-free-png.png');
      setPlantImg('https://pngfre.com/wp-content/uploads/rose-65-852x1024.png');
    }
    else if (plant.plantType === 'Blueberry') {
      setAbout('Blueberries grow on certain species of plants in the genus Vaccinium. They are often are valued for their health benefits, nutrition, freshness, and sweet taste.')
      setInstructions('To tend a blueberry, add water twice a day');
      setAboutImg('https://www.plantmegreen.com/cdn/shop/products/DukeBlueberryFruitDetail_PMG.jpg?v=1636636953')
      setSeedImg('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/28541/tj-openclipart-16-seed-germinating-20-2-16-clipart-md.png');
      setSproutImg('https://static.vecteezy.com/system/resources/previews/023/258/444/original/sprout-graphic-clipart-design-free-png.png');
      setPlantImg('https://static.vecteezy.com/system/resources/previews/023/254/577/non_2x/blueberry-clipart-fruit-illustration-free-png.png');
    } else if (plant.plantType === 'Carrot') {
      setAbout('Carrots are a versatile root vegetable known for their nutritional value and sweet flavor. In some cultures, they are associated with simplicity, fertility, and grounding.')
      setInstructions('To tend a carrot, add water once a day');
      setAboutImg('https://cdn.loveandlemons.com/wp-content/uploads/2021/03/grated-carrot.jpg')
      setSeedImg('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/28541/tj-openclipart-16-seed-germinating-20-2-16-clipart-md.png');
      setSproutImg('https://static.vecteezy.com/system/resources/previews/023/258/444/original/sprout-graphic-clipart-design-free-png.png');
      setPlantImg('https://png.pngtree.com/png-clipart/20220206/original/pngtree-carrots-vegetable-with-leaves-png-for-free-download-png-image_7263912.png');
    }
  }, [plant.plantType])
  return (
    <>
      <Box position='relative' padding='4'>
        <Divider />
        <AbsoluteCenter bg='white' px='4'>
          <b>{plant.plantType}</b>
        </AbsoluteCenter>
      </Box>
      <Container>
        <Grid templateColumns='1fr 2fr' gap={3}>
          <GridItem w='100%' h='40' display='flex'>
            <Image src={aboutImg} alt={plant.plantType + ' about image'}/>
          </GridItem>
          <GridItem w='100%' h='40' display='flex'>
            <p>{about}</p>
          </GridItem>
        </Grid>
        <br />
        <Heading as='h5' size='sm'>Care Instructions</Heading>
        <p>{instructions}</p>
        <br />
        <Heading as='h5' size='sm'>Life Cycle</Heading>
        <Grid templateColumns='1fr 1fr 1fr' gap={1}>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={seedImg} alt={plant.plantType + ' seed image'}/>
          </GridItem>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={sproutImg} alt={plant.plantType + ' sprout image'}/>
          </GridItem>
          <GridItem w='100%' h='20' display='flex'>
            <Image src={plantImg} alt={plant.plantType + ' mature image'}/>
          </GridItem>
        </Grid>

      </Container>
    </>
  );
}
