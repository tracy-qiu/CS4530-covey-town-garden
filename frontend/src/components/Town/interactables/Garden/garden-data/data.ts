import {
  PlantAge,
  PlantDetailsData,
  PlantType,
} from '../../../../../../../shared/types/CoveyTownSocket';

export const PLANT_DETAILS_DATA: PlantDetailsData[] = [
  {
    type: 'Rose',
    about:
      'Roses have been symbols of love and beauty for centuries. Red roses traditionally represent love and passion, while white roses symbolize purity and innocence.',
    instructions: 'To tend a rose, water it once a day.',
    aboutImg: './images/rose_about.jpeg',
    seedImg: './images/rose_seedling.png',
    sproutImg: './images/rose_sprout.png',
    matureImg: './images/mature_rose.png',
  },
  {
    type: 'Blueberry',
    about:
      'Blueberries grow on certain species of plants in the genus Vaccinium. They are often are valued for their health benefits, nutrition, freshness, and sweet taste.',
    instructions: 'To tend a blueberry, water it once a day.',
    aboutImg: './images/blueberry_about.jpeg',
    seedImg: './images/blueberry_seedling.png',
    sproutImg: './images/blueberry_sprout.png',
    matureImg: './images/mature_blueberry.png',
  },
  {
    type: 'Carrot',
    about:
      'Carrots are a versatile root vegetable known for their nutritional value and sweet flavor. In some cultures, they are associated with simplicity, fertility, and grounding.',
    instructions: 'To tend a carrot, water it once a day.',
    aboutImg: './images/carrot_about.jpeg',
    seedImg: './images/carrot_seedling.png',
    sproutImg: './images/carrot_sprout.png',
    matureImg: './images/mature_carrot.png',
  },
];

export const PLANT_TYPES_DATA: PlantType[] = ['Rose', 'Blueberry', 'Carrot'];

export const PLANT_AGES_DATA: PlantAge[] = ['Seedling', 'Sprout', 'Adult'];
