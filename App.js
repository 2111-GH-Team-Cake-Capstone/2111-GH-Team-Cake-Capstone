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
import merge from "deepmerge";
import { LogBox } from "react-native";
import {
  FirebaseAuthProvider,
  useFirebaseAuth,
} from "./context/FirebaseAuthContext";
import { DogProvider, useDog } from "./context/DogContext"

//Components
import Home from "./Components/Home";
import ViewProfile from "./Components/ViewProfile";
import EditProfile from "./Components/EditProfile";
import Login from "./Components/Login";
import ChatMain from "./Components/ChatMain";
import BrowseUsers from "./Components/BrowseUsers";
import MatchProfile from "./Components/MatchProfile";
import CustomNavigationBar from "./Components/CustomNavigationBar";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
//const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const theme = {
  ...CombinedDefaultTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: "#f04c64",
    //accent: '#f1c40f',
  },
};
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage"]); // Ignore log notification by message

function App() {
  return (
    <PaperProvider theme={theme}>
      <FirebaseAuthProvider>
        <DogProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                header: props => <CustomNavigationBar {...props} />,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ViewProfile" component={ViewProfile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="BrowseUsers" component={BrowseUsers} />
              <Stack.Screen name="MatchProfile" component={MatchProfile} />
              <Stack.Screen name="ChatMain" component={ChatMain} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DogProvider>
      </FirebaseAuthProvider>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export default App;
