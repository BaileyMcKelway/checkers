import { StyleSheet, View } from 'react-native';
import CheckerBoard from './components/CheckerBoard';

export default function App() {
  return (
    <View style={styles.container}>
      <CheckerBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
