import { StatusBar } from 'expo-status-bar';
import { Text, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Components/Home';
import Profile from './Components/Profile';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export default App;


