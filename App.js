import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Headline, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <Headline>Welcome to Leashed!</Headline>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </PaperProvider>
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
