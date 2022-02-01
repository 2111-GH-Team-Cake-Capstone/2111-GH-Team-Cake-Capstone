import { StatusBar } from 'expo-status-bar';
import { Text,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import merge from 'deepmerge';

import Home from './Components/Home';
import Profile from './Components/Profile';
import Login from './Components/Login';

//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export default App;
