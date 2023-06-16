import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import AppContainer from './app/navigation/navigation'
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppContainer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
  },
});
