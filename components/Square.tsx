import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  PIECES,
  blackCheckerColor,
  boardColor1,
  boardColor2,
  selectedColor1,
  selectedColor2,
  whiteCheckerColor,
} from './utils';

const windowWidth = Dimensions.get('window').width;
const squaresPerRow = 8;
const squareSize = Math.min((windowWidth * 0.9) / squaresPerRow, 112.5);

interface SquareProps {
  row: number;
  col: number;
  checker: number;
  handlePress: (row: number, col: number) => void;
  isSelected: boolean | null;
}

const Square: React.FC<SquareProps> = ({
  row,
  col,
  checker,
  handlePress,
  isSelected,
}) => {
  const isCheckerWhite =
    checker === PIECES.WHITE || checker === PIECES.WHITE_KING;
  const isCheckerBlack =
    checker === PIECES.BLACK || checker === PIECES.BLACK_KING;
  const isKing =
    Math.abs(checker) === PIECES.WHITE_KING ||
    Math.abs(checker) === PIECES.BLACK_KING;
  const isDarkSquare = (row + col) % 2 === 1;

  const backgroundColor = isDarkSquare
    ? isSelected
      ? selectedColor1
      : boardColor1
    : isSelected
    ? selectedColor2
    : boardColor2;

  const checkerColor = isCheckerWhite
    ? whiteCheckerColor
    : isCheckerBlack
    ? blackCheckerColor
    : 'transparent';

  return (
    <TouchableOpacity
      style={[
        styles.square,
        { backgroundColor, width: squareSize, height: squareSize },
      ]}
      onPress={() => handlePress(row, col)}
    >
      {checker !== 0 && (
        <View style={[styles.checker, { backgroundColor: checkerColor }]}>
          {isKing && <Text style={styles.kingText}>K</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  square: {
    width: squareSize,
    height: squareSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  checker: {
    width: '80%',
    height: '80%',
    borderRadius: squareSize * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  kingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Square;
