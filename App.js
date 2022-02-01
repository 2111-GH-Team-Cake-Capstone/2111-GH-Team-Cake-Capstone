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

import Home from "./Components/Home";
import Profile from "./Components/Profile";
import ChatScreen from "./Components/Chat/ChatScreen";
import ChatList from "./Components/Chat/ChatList";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
const Stack = createNativeStackNavigator();

function App() {
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
}

export default App;
