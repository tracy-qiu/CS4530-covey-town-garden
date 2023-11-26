import { render, screen } from '@testing-library/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { Plant, PlantDetailsData } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { MockProxy, mock } from 'jest-mock-extended';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import { LoginController } from '../../../../../contexts/LoginControllerContext';
import { PLANT_DETAILS_DATA } from '../garden-data/data';
import PlantDetails from './PlantDetails';

describe('PlantDetails', () => {
  const mockLoginController: MockProxy<LoginController> = mock<LoginController>();
  process.env.NEXT_PUBLIC_TOWNS_SERVICE_URL = 'test';
  const townID = nanoid();
  const townController = new TownController({
    userName: 'ourUsername',
    townID,
    loginController: mockLoginController,
  });

  const testPlant: Plant = {
    pid: '1',
    name: 'blueberry',
    species: 'Blueberry',
    age: 'Seedling',
    lastWatered: new Date(),
    status: 'Healthy',
  };

  const PlantDetailsComponent = () => {
    return (
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <PlantDetails species={testPlant.species} age={testPlant.age} />
        </TownControllerContext.Provider>
      </ChakraProvider>
    );
  };

  it('should render details of given plant species', () => {
    render(<PlantDetailsComponent />);
    screen.getByText(testPlant.species);
    const plantInfo: PlantDetailsData | undefined =
      PLANT_DETAILS_DATA.find(info => info.type === testPlant.species) ?? undefined;
    if (plantInfo) {
      screen.getByText(plantInfo.about);
      screen.getByText(plantInfo.instructions);
      screen.getByText(plantInfo.type);
    }
    const aboutImage = document.querySelector('img') as HTMLImageElement;
    expect(aboutImage.alt).toContain(testPlant.species + ' about image');
    screen.getByText('Care Instructions');
    screen.getByText('Life Cycle');
    screen.getByText('Seedling');
    screen.getByText('Sprout');
    screen.getByText('Adult');
  });
});
