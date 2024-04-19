import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';
import { CheckerPosition } from './CheckerBoard';

const Row: React.FC<{
  row: number;
  checkers: number[][];
  handlePress: (row: number, col: number) => void;
  selectedChecker: CheckerPosition | null;
}> = ({ row, checkers, handlePress, selectedChecker }) => {
  return (
    <View style={styles.row} testID={'row'}>
      {Array.from({ length: 8 }, (_, col) => {
        const isSelected =
          selectedChecker &&
          selectedChecker.row === row &&
          selectedChecker.col === col;
        return (
          <Square
            key={col}
            row={row}
            col={col}
            checker={checkers[row][col]}
            handlePress={handlePress}
            isSelected={isSelected}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default Row;
