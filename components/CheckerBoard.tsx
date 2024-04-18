import React, { useState } from 'react';
import Board from './Board';
import { initializeCheckers } from './utils';

const CheckerBoard: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(initializeCheckers());
  const [selectedChecker, setSelectedChecker] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const handlePress = (row: number, col: number): void => {
    if (selectedChecker) {
      const isValidMove =
        board[row][col] === 0 &&
        Math.abs(selectedChecker.row - row) === 1 &&
        Math.abs(selectedChecker.col - col) === 1 &&
        ((board[selectedChecker.row][selectedChecker.col] === 1 &&
          row > selectedChecker.row) ||
          (board[selectedChecker.row][selectedChecker.col] === 2 &&
            row < selectedChecker.row));

      if (isValidMove) {
        const newBoard = board.map((row) => [...row]);
        newBoard[row][col] = newBoard[selectedChecker.row][selectedChecker.col];
        newBoard[selectedChecker.row][selectedChecker.col] = 0;

        setBoard(newBoard);
        setSelectedChecker(null);
      } else {
        setSelectedChecker(null);
      }
    } else {
      if (board[row][col] !== 0) {
        setSelectedChecker({ row, col });
      }
    }
  };

  return <Board checkers={board} handlePress={handlePress} />;
};

export default CheckerBoard;
