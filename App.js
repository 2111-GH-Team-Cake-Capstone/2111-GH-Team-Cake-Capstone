import { StatusBar } from "expo-status-bar";
import {
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
//import merge from 'deepmerge';

import { AuthProvider } from "./hooks/useAuth";

//Components
import Home from "./Components/Home";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import BrowseUsers from './Components/BrowseUsers';
import MatchProfile from "./Components/MatchProfile";

//const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage"]); // Ignore log notification by message

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />

           <Stack.Screen name="BrowseUsers" component={BrowseUsers} />
            <Stack.Screen name="MatchProfile" component={MatchProfile} />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />

          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export default App;
