import { StatusBar } from "expo-status-bar";
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
import ChatScreen from "./Components/Chat/ChatScreen";
import ChatList from "./Components/Chat/ChatList";

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
						<Stack.Screen
							options={{ headerShown: false }}
							name="Login"
							component={Login}
						/>
						<Stack.Screen name="ChatScreen" component={ChatScreen} />
						<Stack.Screen name="ChatList" component={ChatList} />
					</Stack.Navigator>
				</AuthProvider>
			</NavigationContainer>
			<StatusBar style="auto" />
		</PaperProvider>
	);
}

export default App;
