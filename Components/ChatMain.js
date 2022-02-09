import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
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
import { useFirebaseAuth } from "../context/FirebaseAuthContext";

// THINGS THAT NEED TO BE COMPLETED:
// 1. Add "last message" if possible

export default function ChatMain({ navigation }) {
	const [matches, setMatches] = useState([]);
	const [users, setUsers] = useState([]);
	// const [lastMessage, setLastMessage] = useState("");
	const currentUser = useFirebaseAuth();

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
	// console.log("USERS LOOK HERE", users);

	// useEffect below has an implicit return to serve as cleanup
	useEffect(() => {
		if (currentUser) {
			//for navBar logout
			onSnapshot(
				query(collection(db, "matches"), where("dog_a", "==", currentUser.uid)),
				(snapshot) => {
					const matchesDogA = snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}));
					onSnapshot(
						query(
							collection(db, "matches"),
							where("dog_b", "==", currentUser.uid)
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
	}, [currentUser]);
	// console.log("MATCHES LOOK HERE", matches);

	//for navBar logout:
	if (!currentUser) {
		return null;
	}

	const matchesList = matches.map((match) => {
		return match.dog_a === currentUser.uid
			? { id: match.id, matchedDog: match.dog_b }
			: { id: match.id, matchedDog: match.dog_a };
	});
	// console.log("MATCHES LIST LOOK HERE", matchesList);

	return (
		<ImageBackground
			source={require("../assets/capstone_bg.gif")}
			style={styles.bgImage}
		>
			<View>
				{matchesList.length > 0 ? (
					users.map((user) =>
						matchesList.map((match) =>
							match.matchedDog === user.uid ? (
								<TouchableOpacity key={user.id}>
									<Avatar.Image
										style={styles.avatarImg}
										source={{
											uri: user.picture,
										}}
									/>
									<Text
										style={styles.chats}
										mode="contained"
										onPress={() =>
											navigation.navigate("ChatMessage", { match })
										}
									>
										<Title>{user.name}</Title>
									</Text>
									<Paragraph style={styles.chats}>Say hi!</Paragraph>
									<Divider style={styles.divider} />
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
			</View>
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
	avatarImg: {
		borderRadius: 60,
		height: 1,
		width: 1,
		marginLeft: 15,
		marginBottom: 10,
		marginTop: 12,
	},
	chats: {
		marginLeft: 90,
		alignSelf: "flex-start",
		justifyContent: "space-between",
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
