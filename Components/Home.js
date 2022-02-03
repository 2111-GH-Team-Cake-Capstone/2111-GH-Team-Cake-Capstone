import { StyleSheet, View } from "react-native";
import { Headline, Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


export default function Home({ navigation }) {

	return (
		<View style={styles.container}>
			<Headline>Welcome to Leashed!</Headline>
			<Button style={styles.button} mode="contained" onPress={() => navigation.navigate("Profile")}>
				Profile
			</Button>
			<Button style={styles.button} mode="contained" onPress={console.log("logout")}>
				Logout
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		marginTop: 20,
	}
});
