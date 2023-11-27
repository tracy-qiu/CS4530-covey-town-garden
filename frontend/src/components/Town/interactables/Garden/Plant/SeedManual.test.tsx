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

  const mockedOnClick = jest.fn();

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

  it('should render planting functionality if the user is the owner of the garden', () => {
    render(<SeedManualComponent gardenerUsername='ourUsername' />);
    PLANT_TYPES_DATA.forEach(async (type, index) => {
      const accordionSection = screen.getByTestId('seedManualAccordion' + index);

      const plantNameInput = within(accordionSection).getByTestId('plantMeInput' + index);
      expect(plantNameInput).toBeInTheDocument();
      fireEvent.change(plantNameInput, { target: { value: 'testPlantName' } });

      const plantMeBtn = within(accordionSection).getByText('Plant Me!');
      expect(plantMeBtn).toBeInTheDocument();

      fireEvent.click(plantMeBtn);

      await waitFor(() => {
        expect(mockToast).toBeCalledWith(
          expect.objectContaining({
            status: 'success',
          }),
        );
      });
    });
  });

  it('should have error toast if the input field for planting is empty', () => {
    render(<SeedManualComponent gardenerUsername='ourUsername' />);
    PLANT_TYPES_DATA.forEach(async (type, index) => {
      const accordionSection = screen.getByTestId('seedManualAccordion' + index);

      const plantNameInput = within(accordionSection).getByTestId('plantMeInput' + index);
      expect(plantNameInput).toBeInTheDocument();
      fireEvent.change(plantNameInput, { target: { value: '' } });

      const plantMeBtn = within(accordionSection).getByText('Plant Me!');
      expect(plantMeBtn).toBeInTheDocument();

      fireEvent.click(plantMeBtn);

      await waitFor(() => {
        expect(mockToast).toBeCalledWith(
          expect.objectContaining({
            status: 'error',
          }),
        );
      });
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
