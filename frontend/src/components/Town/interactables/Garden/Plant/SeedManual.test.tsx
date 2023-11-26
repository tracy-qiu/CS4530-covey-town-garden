import { render, screen } from '@testing-library/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import PlantCare from './PlantCare';
import { Plant, PlantDetailsData, PlayerLocation } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { MockProxy, mock } from 'jest-mock-extended';
import PlayerController from '../../../../../classes/PlayerController';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import { LoginController } from '../../../../../contexts/LoginControllerContext';
import { PLANT_DETAILS_DATA, PLANT_TYPES_DATA } from '../garden-data/data';
import { SeedManual } from './SeedManual';

describe('SeedManual', () => {
  const randomLocation = (): PlayerLocation => ({
    moving: Math.random() < 0.5,
    rotation: 'front',
    x: Math.random() * 1000,
    y: Math.random() * 1000,
  });

  const ourPlayer: PlayerController = new PlayerController(
    'ourUserID',
    'ourUsername',
    randomLocation(),
  );
  const mockLoginController: MockProxy<LoginController> = mock<LoginController>();
  process.env.NEXT_PUBLIC_TOWNS_SERVICE_URL = 'test';
  const townID = nanoid();
  const townController = new TownController({
    userName: 'ourUsername',
    townID,
    loginController: mockLoginController,
  });

  Object.defineProperty(townController, 'ourPlayer', { get: () => ourPlayer });

  const SeedManualComponent = ({ gardenerUsername }: { gardenerUsername: string }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <SeedManual isOpen={show} onClose={handleClose} username={gardenerUsername} />
        </TownControllerContext.Provider>
      </ChakraProvider>
    );
  };

  it('should render Seed Manual header', () => {
    render(<SeedManualComponent gardenerUsername='gardenerUsername' />);
    screen.getByText('Seed Manual');
  });

  it('should display details of all 3 plants', () => {
    render(<SeedManualComponent gardenerUsername='gardenerUsername' />);
    // PLANT_TYPES_DATA.forEach(type => screen.getByText(type));
    screen.getByText('Rose');
    screen.getByText('Carrot');
    screen.getByText('Blueberry');
    // screen.getByText('Rose');
    // const plantInfo: PlantDetailsData | undefined =
    //   PLANT_DETAILS_DATA.find(info => info.type === testPlant.species) ?? undefined;
    // if (plantInfo) {
    //   screen.getByText(plantInfo.about);
    //   screen.getByText(plantInfo.instructions);
    // }
    // screen.getByText('Care Instructions');
    // screen.getByText('Life Cycle');
  });

//   it('should not render plant actions section if the owner is viewing another garden', () => {
//     const { queryByText } = render(<SeedManualComponent gardenerUsername='gardenerUsername' />);
//     const statusText = queryByText('Plant Status');
//     expect(statusText).toBeNull();
//   });

//   it('should render plant actions section if the owner is viewing their own garden', () => {
//     render(<SeedManualComponent gardenerUsername='ourUsername' />);
//     screen.getByText('Plant Status');
//   });
});
