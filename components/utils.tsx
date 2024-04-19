export const CAPTURE_MOVE_DELTA = 2;

export const PIECES = {
  EMPTY: 0,
  WHITE: 1,
  BLACK: 2,
  WHITE_KING: 3,
  BLACK_KING: -3,
};

export const PLAYERS = {
  WHITE: 1,
  BLACK: 2,
};

export const boardColor2 = '#efe9e3';
export const boardColor1 = '#78ae80';
export const selectedColor1 = '#617f5e';
export const selectedColor2 = '#cfc4b6';
export const whiteCheckerColor = '#eedfbc';
export const blackCheckerColor = '#c23a42';

const numRows = 8;
const numCols = 8;

export const initializeCheckers = (): number[][] => {
  const checkers: number[][] = [];

  for (let i = 0; i < numRows; i++) {
    checkers.push(Array(numCols).fill(0));
  }

  for (let i = 0; i < 3; i++) {
    for (let j = i % 2; j < numCols; j += 2) {
      checkers[i][j] = 1;
    }
  }

  for (let i = numRows - 1; i >= numRows - 3; i--) {
    for (let j = i % 2; j < numCols; j += 2) {
      checkers[i][j] = 2;
    }
  }

  return checkers;
};
