import React from 'react';
import { render } from '@testing-library/react-native';
import Board from '../Board';
import { initializeCheckers } from '../utils';

describe('Board component', () => {
  it('should render a board with 8 rows and 8 squares each', () => {
    const checkers = Array.from({ length: 8 }, () => Array(8).fill(0));
    const handlePress = jest.fn();
    const selectedChecker = null;

    const { getAllByTestId } = render(
      <Board
        checkers={checkers}
        handlePress={handlePress}
        selectedChecker={selectedChecker}
      />
    );

    const rows = getAllByTestId('row');
    const squares = getAllByTestId('square');

    expect(rows.length).toBe(8);
    expect(squares.length).toBe(64);
  });

  it('should render an empty board when checkers array is undefined', () => {
    const checkers = initializeCheckers();
    const handlePress = jest.fn();
    const selectedChecker = null;

    const { queryAllByTestId } = render(
      <Board
        checkers={checkers}
        handlePress={handlePress}
        selectedChecker={selectedChecker}
      />
    );

    const rows = queryAllByTestId('row');
    const squares = queryAllByTestId('square');
    expect(rows.length).toBe(8);
    expect(squares.length).toBe(64);
  });
});
