import { StatusBar } from 'expo-status-bar';
import { Text, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Components/Home';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Text>Router Hello!</Text>
          <StatusBar style="auto" />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

