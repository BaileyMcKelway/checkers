import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

const Row: React.FC<{
  row: number;
  checkers: number[][];
  handlePress: (row: number, col: number) => void;
}> = ({ row, checkers, handlePress }) => (
  <View style={styles.row}>
    {Array.from({ length: 8 }, (_, col) => (
      <Square
        key={col}
        row={row}
        col={col}
        checker={checkers[row][col]}
        handlePress={handlePress}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;
