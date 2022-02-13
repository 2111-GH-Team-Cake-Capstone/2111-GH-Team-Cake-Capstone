import { StatusBar } from "expo-status-bar";
import {
	DefaultTheme as PaperDefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import {
	NavigationContainer,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import merge from "deepmerge";
import { LogBox } from "react-native";
import {
	FirebaseAuthProvider,
	useFirebaseAuth,
} from "./context/FirebaseAuthContext";
import { DogProvider, useDog } from "./context/DogContext";

//Components
import Home from "./Components/Home";
import ViewProfile from "./Components/ViewProfile";
import EditProfile from "./Components/EditProfile";
import Login from "./Components/Login";
import ChatMain from "./Components/ChatMain";
import ChatMessage from "./Components/ChatMessage";
import BrowseUsers from "./Components/BrowseUsers";
import MatchProfile from "./Components/MatchProfile";
import MatchModal from "./Components/MatchModal";
import TinderCard from "./Components/TinderCard";
import NoSwipesScreen from "./Components/NoSwipesScreen";
import CustomNavigationBar from "./Components/CustomNavigationBar";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const theme = {
	...CombinedDefaultTheme,
	colors: {
		...CombinedDefaultTheme.colors,
		primary: "#f04c64",
	},
};
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["AsyncStorage"]); // Ignore log notification by message
//LogBox.ignoreAllLogs();//Hide all warning notifications on front-end *FOR DEMO DAY?*

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
              <Stack.Screen name="TinderCard" component={TinderCard} />
              <Stack.Group screenOptions={{ presentation: "transparentModal", headerShown: false}}>
                <Stack.Screen name="MatchModal" component={MatchModal} />
              </Stack.Group>
              <Stack.Screen name="NoSwipesScreen" component={NoSwipesScreen} />
              <Stack.Screen name="MatchProfile" component={MatchProfile} />
              <Stack.Screen name="ChatMain" component={ChatMain} />
              <Stack.Screen name="ChatMessage" component={ChatMessage} />
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
