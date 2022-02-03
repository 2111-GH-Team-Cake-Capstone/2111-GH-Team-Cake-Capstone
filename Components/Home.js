import { StyleSheet, View, ImageBackground } from "react-native";
import { Headline, Button } from "react-native-paper";

export default function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
				<Headline style={styles.heading}>Welcome to Leashed!</Headline>
				<Button style={styles.input} mode="contained" onPress={() => navigation.navigate("Profile")}>
					Profile
				</Button>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		marginTop: 20,
		marginLeft: 90,
		marginRight: 90,
  },
  heading: {
    alignSelf: 'center',
  },
	bgImage: {
		flex: 1,
    justifyContent: 'center',
    height: "100%",
		width: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },
});
