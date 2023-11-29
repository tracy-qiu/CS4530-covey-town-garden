import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import 'core-js';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { PlayerLocation } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { MockProxy, mock } from 'jest-mock-extended';
import PlayerController from '../../../../../classes/PlayerController';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import { LoginController } from '../../../../../contexts/LoginControllerContext';
import { PLANT_TYPES_DATA } from '../garden-data/data';
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

  const mockToast = jest.fn();
  jest.mock('@chakra-ui/react', () => {
    const ui = jest.requireActual('@chakra-ui/react');
    const mockUseToast = () => mockToast;
    return {
      ...ui,
      useToast: mockUseToast,
    };
  });

  beforeEach(() => {
    // gameAreaController.mockReset();
    mockToast.mockReset();
  });

  const SeedManualComponent = ({ gardenerUsername }: { gardenerUsername: string }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <SeedManual
            gardenId={'656706fca6c61426b822feee'}
            gardenPlotId={'656706fca6c61426b822fef4'}
            plotPlantId={1}
            isOpen={show}
            onClose={handleClose}
            username={gardenerUsername}
            plantNames={['existingPlant1', 'existingPlant2']}
          />
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
    PLANT_TYPES_DATA.forEach((type, index) => {
      const accordionSection = screen.getByTestId('seedManualAccordion' + index);
      const accordionHeader = within(accordionSection).getAllByText(type)[0];
      expect(accordionHeader).toBeInTheDocument();
    });
  });

  it('should not display planting functionality if the user is not the owner of the garden', () => {
    render(<SeedManualComponent gardenerUsername='gardenerUsername' />);
    PLANT_TYPES_DATA.forEach(async (type, index) => {
      const accordionSection = screen.getByTestId('seedManualAccordion' + index);
      const plantMeBtn = within(accordionSection).queryByText('Plant Me!');
      expect(plantMeBtn).toBeNull();
    });
  });
});
