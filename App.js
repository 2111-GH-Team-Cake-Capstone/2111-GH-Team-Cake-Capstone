import { StatusBar } from "expo-status-bar";
import {
<<<<<<< HEAD
	Text,
	DarkTheme as PaperDarkTheme,
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import merge from "deepmerge";

import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ChatScreen from "./Components/Chat/ChatScreen";
import ChatList from "./Components/Chat/ChatList";
=======
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import merge from 'deepmerge';
import { AuthProvider } from './hooks/useAuth';

//Components
import Home from './Components/Home';
import Profile from './Components/Profile';
import Login from './Components/Login';
>>>>>>> 5e7ad5767bf17344832b77c92d2cc1b45631df9f


//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createNativeStackNavigator();

function App() {
<<<<<<< HEAD
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="ChatScreen" component={ChatScreen} />
					<Stack.Screen name="ChatList" component={ChatList} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style="auto" />
		</PaperProvider>
	);
=======

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
>>>>>>> 5e7ad5767bf17344832b77c92d2cc1b45631df9f
}

export default App;
