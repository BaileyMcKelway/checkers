import React from 'react';
import { View, StyleSheet } from 'react-native';
import Row from './Row';
import { CheckerPosition } from './CheckerBoard';

interface BoardProps {
  checkers: number[][];
  handlePress: (row: number, col: number) => void;
  selectedChecker: CheckerPosition | null;
}

const numRows = 8;

const Board: React.FC<BoardProps> = ({
  checkers,
  handlePress,
  selectedChecker,
}) => (
  <View style={styles.board}>
    {Array.from({ length: numRows }, (_, row) => (
      <Row
        key={row}
        row={row}
        checkers={checkers}
        handlePress={handlePress}
        selectedChecker={selectedChecker}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    width: '90%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
});

export default Board;
