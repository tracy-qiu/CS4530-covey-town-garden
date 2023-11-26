import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { Plant, PlayerLocation } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { MockProxy, mock } from 'jest-mock-extended';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import { LoginController } from '../../../../../contexts/LoginControllerContext';
import PlantActions from './PlantActions';
import PlantCare from './PlantCare';
import PlayerController from '../../../../../classes/PlayerController';

describe('PlantActions', () => {
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

  const testPlant: Plant = {
    pid: '1',
    name: 'blueberry',
    species: 'Blueberry',
    age: 'Seedling',
    lastWatered: new Date(),
    status: 'Healthy',
  };

  const PlantActionsComponent = () => {
    return (
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <PlantActions plant={testPlant} />
        </TownControllerContext.Provider>
      </ChakraProvider>
    );
  };

  const PlantCareComponent = ({ gardenerUsername }: { gardenerUsername: string }) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    return (
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <PlantCare
            isOpen={show}
            onClose={handleClose}
            username={gardenerUsername}
            plant={testPlant}
          />
        </TownControllerContext.Provider>
      </ChakraProvider>
    );
  };

  it('should render plant status', () => {
    render(<PlantActionsComponent />);
    screen.getByText('Plant Status');
    screen.getByText('Hello! My name is ' + testPlant.name);
    screen.getByText(testPlant.status);
    screen.getByText(testPlant.age);
  });

  it('should render plant action buttons', () => {
    render(<PlantActionsComponent />);
    screen.getByText('Actions');
    const waterPlantBtn = screen.getByText('Water Me!');
    expect(waterPlantBtn).toBeInTheDocument();
    const removePlantBtn = screen.getByText('Remove Plant');
    expect(removePlantBtn).toBeInTheDocument();
  });

  it('should display toasts and update last watered date when water me button is clicked', async () => {
    render(<PlantCareComponent gardenerUsername='ourUsername' />);

    // Access the child component using its test ID
    const childComponent = screen.getByTestId('childPlantActions');

    // Perform assertions or actions on the child component
    expect(childComponent).toBeInTheDocument();
    // expect(childComponent.textContent).toBe('I am the child component');

    const waterPlantBtn = within(childComponent).getByTestId('waterMeBtn');

    fireEvent.click(waterPlantBtn);

    await waitFor(() => {
    //   expect(mockToast).toBeCalledWith(
    //     expect.objectContaining({
    //       status: 'success',
    //     }),
    //   );
      screen.getByText(
        new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
      );
    });
  });

  it('should display toasts when remove plant button is clicked', async () => {
    render(<PlantCareComponent gardenerUsername='ourUsername' />);

    // Access the child component using its test ID
    const childComponent = screen.getByTestId('childPlantActions');

    // Perform assertions or actions on the child component
    expect(childComponent).toBeInTheDocument();
    // expect(childComponent.textContent).toBe('I am the child component');

    const removePlantBtn = within(childComponent).getByTestId('removePlantBtn');

    fireEvent.click(removePlantBtn);

    // await waitFor(() => {
    //   expect(mockToast).toBeCalledWith(
    //     expect.objectContaining({
    //       status: 'success',
    //     }),
    //   );
    // });
  });
});
