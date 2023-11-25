import { render, screen, within } from '@testing-library/react';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
// import { GameResult } from '../../../types/CoveyTownSocket';
import PlantCare from './PlantCare';
import { Plant } from '../../../../../types/CoveyTownSocket';
import { ChakraProvider } from '@chakra-ui/react';
import { mock } from 'jest-mock-extended';
import PlayerController from '../../../../../classes/PlayerController';
import TownController from '../../../../../classes/TownController';
import TownControllerContext from '../../../../../contexts/TownControllerContext';
import TicTacToeAreaWrapper from '../../TicTacToe/TicTacToeArea';

describe('[T1] PlantCare', () => {
  let ourPlayer: PlayerController;
  const townController = mock<TownController>();
  Object.defineProperty(townController, 'ourPlayer', { get: () => ourPlayer });
  // let gameAreaController = new MockTicTacToeAreaController();
  // let joinGameResolve: () => void;
  // let joinGameReject: (err: Error) => void;

  function renderPlantCare() {
    return render(
      <ChakraProvider>
        <TownControllerContext.Provider value={townController}>
          <TicTacToeAreaWrapper />
        </TownControllerContext.Provider>
      </ChakraProvider>,
    );
  }

  const TestComponent = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);

    const testPlant: Plant = {
      pid: '1',
      name: 'blueberry',
      species: 'Blueberry',
      age: 'Seedling',
      lastWatered: new Date(),
      status: 'Healthy',
    };

    return (
      <PlantCare isOpen={show} onClose={handleClose} username='testUsername' plant={testPlant} />
    );
  };

  it('should render Plant Care header', () => {
    render(<TestComponent />);
    screen.getByText('Plant Care');
  });
  it('should render Plant Care header', () => {
    // const headers = screen.getAllByRole('columnheader');
    // expect(headers).toHaveLength(4);
    // expect(headers[0]).toHaveTextContent('Player');
    // expect(headers[1]).toHaveTextContent('Wins');
    // expect(headers[2]).toHaveTextContent('Losses');
    // expect(headers[3]).toHaveTextContent('Ties');
    // expect(screen.getByRole('heading')).toHaveTextContent('Plant Care');

    // screen.getByText("Plant Care" )
  });
  // it('should render plant details of given plant', () => {
  //   const rows = screen.getAllByRole('row');
  //   expect(rows).toHaveLength(4);
  // });
  // it('should render plant actions if the owner is viewing their own garden', () => {
  //   const rows = screen.getAllByRole('row');
  //   checkRow(rows[1], winner);
  //   checkRow(rows[2], middle);
  //   checkRow(rows[3], loser);
  // });
  // it('should calculate the cumulative number of wins, losses, and ties for each player', () => {
  //   const rows = screen.getAllByRole('row');
  //   checkRow(rows[1], winner, 2, 0, 1);
  //   checkRow(rows[2], middle, 1, 2, 1);
  //   checkRow(rows[3], loser, 0, 1, 0);
  // });
});
