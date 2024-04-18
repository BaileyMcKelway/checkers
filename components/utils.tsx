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
