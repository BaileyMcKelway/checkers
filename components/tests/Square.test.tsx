import React from 'react';
import { render } from '@testing-library/react-native';
import Square from '../Square';
import Row from '../Row';

describe('Square component', () => {
  it('should render a square with the correct size and background color', () => {
    const row = 0;
    const col = 0;
    const checker = 1;
    const handlePress = jest.fn();
    const isSelected = true;
    const squareSize = 84.375;
    const selectedColor1 = '#cfc4b6';

    const { getByTestId } = render(
      <Square
        row={row}
        col={col}
        checker={checker}
        handlePress={handlePress}
        isSelected={isSelected}
      />
    );
    const square = getByTestId('square');

    expect(square.props.style.width).toBe(squareSize);
    expect(square.props.style.height).toBe(squareSize);
    expect(square.props.style.backgroundColor).toBe(selectedColor1);
  });

  it('should render a square with the correct size and background color when isSelected is null', () => {
    const row = 0;
    const col = 0;
    const checker = 1;
    const handlePress = jest.fn();
    const isSelected = null;
    const squareSize = 84.375;
    const boardColor1 = '#efe9e3';

    const { getByTestId } = render(
      <Square
        row={row}
        col={col}
        checker={checker}
        handlePress={handlePress}
        isSelected={isSelected}
      />
    );
    const square = getByTestId('square');

    expect(square.props.style.width).toBe(squareSize);
    expect(square.props.style.height).toBe(squareSize);
    expect(square.props.style.backgroundColor).toBe(boardColor1);
  });
});

describe('Row component', () => {
  it('should render a row of 8 Square components', () => {
    const handlePress = jest.fn();
    const selectedChecker = null;
    const checkers = Array(8).fill(
      Array(8)
        .fill(null)
        .map((_, i) => i + 1)
    );

    const { getAllByTestId } = render(
      <Row
        row={0}
        checkers={checkers}
        handlePress={handlePress}
        selectedChecker={selectedChecker}
      />
    );

    const squares = getAllByTestId('square');
    expect(squares.length).toBe(8);
  });

  it('should pass the handlePress function to each Square component', () => {
    const handlePress = jest.fn();
    const selectedChecker = null;
    const checkers = Array(8).fill(Array(8).fill(0));

    const { getAllByTestId } = render(
      <Row
        row={0}
        checkers={checkers}
        handlePress={handlePress}
        selectedChecker={selectedChecker}
      />
    );

    const squares = getAllByTestId('square');
    squares.forEach((square) => {
      square.props.onClick();
    });

    expect(handlePress).toHaveBeenCalledTimes(8);
  });
});
