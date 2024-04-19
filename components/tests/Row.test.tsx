import React from 'react';
import { render } from '@testing-library/react-native';
import Row from '../Row';

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
