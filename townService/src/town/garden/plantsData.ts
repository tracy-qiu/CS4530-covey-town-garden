import { PlantType } from './plants';

export default [
  {
    id: 1,
    gardenPlotId: 'P1',
    name: 'Carrots',
    species: PlantType.CARROTS,
    age: 1,
    daysSinceLastWater: 1,
  },
  {
    id: 2,
    gardenPlotId: 'P2',
    name: 'Roses',
    species: PlantType.ROSES,
    age: 3,
    daysSinceLastWater: 2,
  },
  {
    id: 3,
    gardenPlotId: 'P3',
    name: 'Blueberries',
    species: PlantType.BLUEBERRIES,
    age: 5,
    daysSinceLastWater: 2,
  },
];
