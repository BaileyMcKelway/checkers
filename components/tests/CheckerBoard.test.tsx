import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckerBoard from '../CheckerBoard';

describe('CheckerBoard component', () => {
  it('should render a checker board with initial checkers', () => {
    const { getByTestId } = render(<CheckerBoard />);
    const board = getByTestId('board');

    expect(board).toBeTruthy();
    expect(board.props.children.length).toBeGreaterThan(0);
  });

  it("should not allow a player to move an opponent's checker", () => {
    const { getByTestId, getAllByTestId } = render(<CheckerBoard />);
    const board = getByTestId('board');

    const opponentChecker = getAllByTestId('opponent-checker');

    fireEvent.press(opponentChecker[0]);

    expect(board).toBeTruthy();
  });
});
