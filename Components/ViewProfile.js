import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	ImageBackground,
	Dimensions,
} from "react-native";
import { Button, Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useDog } from "../context/DogContext";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import { useFonts } from "expo-font";

const ViewProfile = ({ navigation }) => {
	const currentDog = useDog();
	const [currentUser, setCurrentUser] = useState(null);
	const firebaseUser = useFirebaseAuth();

	const [loaded] = useFonts({
		Lobster: require("../assets/fonts/LobsterTwo-Bold.ttf"),
	});

	useEffect(() => {
		setCurrentUser(firebaseUser);
	}, [firebaseUser]);

	if (!currentUser) {
		return null;
	}

	return (
		<ScrollView>
			<ImageBackground
				source={require("../assets/capstone_bg.gif")}
				style={styles.bgImage}
				resizeMode="cover"
			>
				<Title style={styles.heading}>Welcome</Title>
				<View style={{ alignItems: "center" }}>
					<Avatar.Image size={160} source={{ uri: currentDog.picture }} />
					<Button
						icon="heart"
						onPress={() => navigation.navigate("BrowseUsers")}
						style={{ marginTop: 10 }}
					>
						Browse Users
					</Button>
					<Button
						icon="message-processing"
						onPress={() => navigation.navigate("ChatMain")}
					>
						Message
					</Button>
				</View>
				<View style={{ margin: 30 }}>
					<Card style={{ alignItems: "center", textAlign: "center" }}>
						<Card.Content>
							<Title style={{ textAlign: "center", fontWeight: "bold" }}>
								Name
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.name}
							</Paragraph>
						</Card.Content>
						<Card.Content>
							<Title style={{ textAlign: "center", fontWeight: "bold" }}>
								Breed
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.breed}
							</Paragraph>
						</Card.Content>
						<Card.Content>
							<Title
								style={{
									textAlign: "center",
									fontWeight: "bold",
								}}
							>
								Age
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.age}
							</Paragraph>
						</Card.Content>
						<Card.Content>
							<Title style={{ textAlign: "center", fontWeight: "bold" }}>
								Weight (lbs)
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.weight}
							</Paragraph>
						</Card.Content>
						<Card.Content>
							<Title style={{ textAlign: "center", fontWeight: "bold" }}>
								City
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.city_location}
							</Paragraph>
						</Card.Content>
						<Card.Content>
							<Title style={{ textAlign: "center", fontWeight: "bold" }}>
								Biography
							</Title>
							<Paragraph style={{ textAlign: "center" }}>
								{currentDog.bio}
							</Paragraph>
						</Card.Content>
					</Card>
					<Button
						mode="contained"
						onPress={() => navigation.navigate("EditProfile")}
						style={styles.button}
					>
						Edit
					</Button>
				</View>
			</ImageBackground>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 25,
	},
	button: {
		width: "50%",
		marginTop: 20,
		left: 90,
	},
	bgImage: {
		width: "100%",
		resizeMode: "stretch",
		padding: 0,
		margin: 0,
	},
	heading: {
		alignSelf: "center",
		color: "#995768",
		fontFamily: "Lobster",
		fontSize: 40,
		padding: "5%",
		marginTop: 10,
	},
});

export default ViewProfile;
