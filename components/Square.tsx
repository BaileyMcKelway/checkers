import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';

interface SquareProps {
  row: number;
  col: number;
  checker: number;
  handlePress: (row: number, col: number) => void;
}

const numCols = 8;
const squareSize = Dimensions.get('window').width / numCols;
const boardColor1 = '#FFD700';
const boardColor2 = '#8B4513';

const Square: React.FC<SquareProps> = ({ row, col, checker, handlePress }) => {
  const isDark = (row + col) % 2 === 1;
  const backgroundColor = isDark ? boardColor1 : boardColor2;
  const checkerColor =
    checker === 1 ? 'white' : checker === 2 ? 'black' : 'transparent';

  return (
    <TouchableOpacity
      style={[
        styles.square,
        { backgroundColor, width: squareSize, height: squareSize } as ViewStyle,
      ]}
      onPress={() => handlePress(row, col)}
    >
      {checker !== 0 && (
        <View style={[styles.checker, { backgroundColor: checkerColor }]} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    borderWidth: 1,
    borderColor: '#000',
  },
  checker: {
    width: '80%',
    height: '80%',
    borderRadius: 25,
    margin: '10%',
  },
});

export default Square;
