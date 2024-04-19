import React, { useState } from 'react';
import Board from './Board';
import {
  CAPTURE_MOVE_DELTA,
  PIECES,
  PLAYERS,
  initializeCheckers,
} from './utils';

export interface CheckerPosition {
  row: number;
  col: number;
}

const CheckerBoard: React.FC = () => {
  const [board, setBoard] = useState<number[][]>(initializeCheckers());
  const [selectedChecker, setSelectedChecker] =
    useState<CheckerPosition | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<number>(PLAYERS.WHITE);

  const handlePress = (row: number, col: number): void => {
    if (selectedChecker) {
      const selectedPiece = board[selectedChecker.row][selectedChecker.col];
      if (isValidMove(row, col, selectedPiece, selectedChecker)) {
        performMove(row, col, selectedChecker);
        checkForPromotion(row, col, selectedChecker);
        togglePlayer();
      } else {
        setSelectedChecker(null);
      }
    } else {
      selectPiece(row, col);
    }
  };

  const isValidMove = (
    targetRow: number,
    targetCol: number,
    selectedPiece: number,
    selectedChecker: CheckerPosition
  ) => {
    const isKing =
      Math.abs(selectedPiece) === PIECES.WHITE_KING ||
      Math.abs(selectedPiece) === PIECES.BLACK_KING;
    const moveDelta = Math.abs(selectedChecker.row - targetRow);
    const isCaptureMove = moveDelta === CAPTURE_MOVE_DELTA;

    const isValidTarget =
      board[targetRow][targetCol] === PIECES.EMPTY &&
      (moveDelta === 1 || isCaptureMove) &&
      Math.abs(selectedChecker.col - targetCol) === moveDelta;

    const isValidDirection =
      isKing ||
      (selectedPiece === PIECES.WHITE && targetRow > selectedChecker.row) ||
      (selectedPiece === PIECES.BLACK && targetRow < selectedChecker.row);

    return (
      isValidTarget &&
      isValidDirection &&
      (!isCaptureMove ||
        isValidCapture(
          selectedChecker,
          { row: targetRow, col: targetCol },
          board
        ))
    );
  };

  const performMove = (
    row: number,
    col: number,
    selectedChecker: CheckerPosition
  ) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[row][col] = newBoard[selectedChecker.row][selectedChecker.col];
    newBoard[selectedChecker.row][selectedChecker.col] = 0;

    if (Math.abs(selectedChecker.row - row) === 2) {
      const capturedRow = (selectedChecker.row + row) / 2;
      const capturedCol = (selectedChecker.col + col) / 2;
      newBoard[capturedRow][capturedCol] = 0;
    }

    setBoard(newBoard);
    setSelectedChecker(null);
  };

  const shouldPromoteToKing = (
    isAlreadyKing: boolean,
    currentPlayerColor: number,
    row: number,
    board: number[][]
  ) => {
    if (isAlreadyKing) {
      return false;
    }

    const isWhitePromotionRow =
      currentPlayerColor === PIECES.WHITE && row === board.length - 1;
    const isBlackPromotionRow =
      currentPlayerColor === PIECES.BLACK && row === 0;

    return isWhitePromotionRow || isBlackPromotionRow;
  };

  const checkForPromotion = (
    row: number,
    col: number,
    selectedChecker: CheckerPosition
  ) => {
    const piece = board[row][col];
    const isAlreadyKing =
      Math.abs(piece) === PIECES.WHITE_KING ||
      Math.abs(piece) === PIECES.BLACK_KING;

    const currentPlayerColor =
      currentPlayer === PLAYERS.WHITE ? PIECES.WHITE : PIECES.BLACK;

    if (shouldPromoteToKing(isAlreadyKing, currentPlayerColor, row, board)) {
      const newBoard = board.map((innerRow) => [...innerRow]);
      newBoard[row][col] =
        currentPlayerColor === PIECES.WHITE
          ? PIECES.WHITE_KING
          : PIECES.BLACK_KING;
      newBoard[selectedChecker.row][selectedChecker.col] = PIECES.EMPTY;

      if (Math.abs(selectedChecker.row - row) === CAPTURE_MOVE_DELTA) {
        const capturedRow = (selectedChecker.row + row) / 2;
        const capturedCol = (selectedChecker.col + col) / 2;
        newBoard[capturedRow][capturedCol] = PIECES.EMPTY;
      }

      setBoard(newBoard);
    }
  };
  const togglePlayer = () => {
    setCurrentPlayer(
      currentPlayer === PLAYERS.WHITE ? PLAYERS.BLACK : PLAYERS.WHITE
    );
  };

  const selectPiece = (row: number, col: number) => {
    if (
      (currentPlayer === PLAYERS.WHITE &&
        (board[row][col] === PIECES.WHITE ||
          board[row][col] === PIECES.WHITE_KING)) ||
      (currentPlayer === PLAYERS.BLACK &&
        (board[row][col] === PIECES.BLACK ||
          board[row][col] === PIECES.BLACK_KING))
    ) {
      setSelectedChecker({ row, col });
    }
  };

  const isValidCapture = (
    from: CheckerPosition,
    to: CheckerPosition,
    board: number[][]
  ) => {
    const middleRow = (from.row + to.row) / 2;
    const middleCol = (from.col + to.col) / 2;
    const middlePiece = board[middleRow][middleCol];

    const isOpponentPiece = (piece: number) => {
      if (currentPlayer === PLAYERS.WHITE) {
        return piece === PIECES.BLACK || piece === PIECES.BLACK_KING;
      } else {
        return piece === PIECES.WHITE || piece === PIECES.WHITE_KING;
      }
    };

    return isOpponentPiece(middlePiece);
  };

  return (
    <Board
      checkers={board}
      handlePress={handlePress}
      selectedChecker={selectedChecker}
    />
  );
};

export default CheckerBoard;
