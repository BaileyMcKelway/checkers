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

/**
 * Initializes a 2D array called "checkers" with dimensions numRows x numCols and populates it with 0s.
 * Sets the values of certain cells in the array to 1 and 2, representing the positions of checkers on a game board.
 * @returns {number[][]} The populated "checkers" array.
 */
export const initializeCheckers = (): number[][] => {
  const checkers: number[][] = [];

  // Initialize the checkers array with 0s
  for (let i = 0; i < numRows; i++) {
    checkers.push(Array(numCols).fill(0));
  }

  // Set the positions of the first player's checkers
  for (let i = 0; i < 3; i++) {
    for (let j = i % 2; j < numCols; j += 2) {
      checkers[i][j] = 1;
    }
  }

  // Set the positions of the second player's checkers
  for (let i = numRows - 1; i >= numRows - 3; i--) {
    for (let j = i % 2; j < numCols; j += 2) {
      checkers[i][j] = 2;
    }
  }

  return checkers;
};
