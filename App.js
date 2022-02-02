import { StatusBar } from "expo-status-bar";
import {
	NavigationContainer,
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import merge from 'deepmerge';
import { AuthProvider } from "./hooks/useAuth";
import { Provider as PaperProvider } from "react-native-paper";

//Components
import Home from './Components/Home';
import Profile from './Components/Profile';
import Login from './Components/Login';
import TinderCard from './Components/TinderCard';
import ChatScreen from "./Components/Chat/ChatScreen";


//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createNativeStackNavigator();

function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="TinderCard" component={TinderCard} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export default App;
