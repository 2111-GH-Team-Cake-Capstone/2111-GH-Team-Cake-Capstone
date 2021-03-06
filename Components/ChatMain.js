import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import { Avatar, Text, Divider, Paragraph, Title } from "react-native-paper";
import db from "../firebase";
import {
	collection,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useDog } from "../context/DogContext";

export default function ChatMain({ navigation }) {
	const currentDog = useDog();
	const [matches, setMatches] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const usersColRef = collection(db, "users");
			const usersData = await getDocs(usersColRef);

			setUsers(
				usersData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};

		getUsers();
	}, []);

	useEffect(() => {
		if (currentDog.uid) {
			onSnapshot(
				query(collection(db, "matches"), where("dog_a", "==", currentDog.uid)),
				(snapshot) => {
					const matchesDogA = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					onSnapshot(
						query(
							collection(db, "matches"),
							where("dog_b", "==", currentDog.uid)
						),
						(snapshot) => {
							const matchesDogB = snapshot.docs.map((doc) => ({
								id: doc.id,
								...doc.data(),
							}));
							const combinedMatches = matchesDogA.concat(matchesDogB);
							setMatches(combinedMatches);
						}
					);
				}
			);
		}
	}, [currentDog]);

	//for navBar logout:
	if (!currentDog.uid) {
		return null;
	}

	const matchesList = matches.map((match) => {
		return match.dog_a === currentDog.uid
			? { id: match.id, matchedDog: match.dog_b }
			: { id: match.id, matchedDog: match.dog_a };
	});

	return (
		<ImageBackground
			source={require("../assets/capstone_bg.gif")}
			style={styles.bgImage}
		>
			<ScrollView>
				{matchesList.length > 0 ? (
					users.map((user) =>
						matchesList.map((match) =>
							match.matchedDog === user.uid ? (
								<TouchableOpacity
									key={user.id}
									mode="contained"
									onPress={() =>
										navigation.navigate("ChatMessage", { user, match })
									}
								>
									<View style={styles.container}>
										{user.picture ? (
											<Avatar.Image
												style={styles.avatarImg}
												source={{
													uri: user.picture,
												}}
											/>
										) : (
											<Avatar.Image
												style={styles.avatarImg}
												source={require("../assets/placeholder.jpg")}
											/>
										)}
										<View style={styles.chats}>
											<Title>{user.name}</Title>
											<Paragraph>Say hi!</Paragraph>
										</View>
									</View>
									<Divider />
								</TouchableOpacity>
							) : null
						)
					)
				) : (
					<View style={styles.noMessages}>
						<Title>No Messages :(</Title>
						<Text>
							Go Match With{" "}
							<Text
								style={styles.link}
								onPress={() => navigation.navigate("BrowseUsers")}
							>
								Other Dogs!
							</Text>
						</Text>
					</View>
				)}
			</ScrollView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	bgImage: {
		flex: 1,
		width: "100%",
		height: "100%",
		resizeMode: "stretch",
		padding: 0,
		margin: 0,
	},
	container: {
		alignSelf: "flex-start",
		flexDirection: "row",
	},
	avatarImg: {
		marginLeft: 15,
		marginBottom: 10,
		marginTop: 15,
	},
	chats: {
		marginLeft: 10,
		justifyContent: "center",
	},
	noMessages: {
		alignItems: "center",
		marginTop: 220,
	},
	link: {
		fontWeight: "bold",
		fontSize: 15,
		color: "#8D6CB3",
	},
	divider: {
		color: "#f04c64",
		marginTop: 5,
	},
});
