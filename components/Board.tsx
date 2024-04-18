import React from 'react';
import { View, StyleSheet } from 'react-native';
import Row from './Row';

interface BoardProps {
  checkers: number[][];
  handlePress: (row: number, col: number) => void;
}

const numRows = 8;

const Board: React.FC<BoardProps> = ({ checkers, handlePress }) => (
  <View style={styles.board}>
    {Array.from({ length: numRows }, (_, row) => (
      <Row key={row} row={row} checkers={checkers} handlePress={handlePress} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Board;
