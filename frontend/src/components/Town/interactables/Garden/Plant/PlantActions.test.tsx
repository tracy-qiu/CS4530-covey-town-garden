import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import 'core-js';
import { nanoid } from 'nanoid';
import React from 'react';
import { Plant } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { MockProxy, mock } from 'jest-mock-extended';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import { LoginController } from '../../../../../contexts/LoginControllerContext';
import PlantActions from './PlantActions';

describe('PlantActions', () => {
  const mockLoginController: MockProxy<LoginController> = mock<LoginController>();
  process.env.NEXT_PUBLIC_TOWNS_SERVICE_URL = 'test';
  const townID = nanoid();
  const townController = new TownController({
    userName: 'ourUsername',
    townID,
    loginController: mockLoginController,
  });

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

  //   it('should display toasts and update last watered date when water me button is clicked', async () => {
  //     render(<PlantActionsComponent />);

  //     const waterPlantBtn = screen.getByText('Water Me!');

  //     fireEvent.click(waterPlantBtn);

  //     await waitFor(() => {
  //         expect(mockToast).toBeCalledWith(
  //           expect.objectContaining({
  //             status: 'success',
  //           }),
  //         );
  //       screen.getByText(
  //         new Date().toLocaleString('en-US', {
  //           year: 'numeric',
  //           month: 'numeric',
  //           day: 'numeric',
  //         }),
  //       );
  //     });
  //   });

  //   it('should display toasts when remove plant button is clicked', async () => {
  //     render(<PlantActionsComponent />);

  //     const removePlantBtn = screen.getByText('Remove Plant');

  //     fireEvent.click(removePlantBtn);

  //     await waitFor(() => {
  //       expect(mockToast).toBeCalledWith(
  //         expect.objectContaining({
  //           status: 'success',
  //         }),
  //       );
  //     });
  //   });
});
