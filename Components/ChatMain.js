import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Headline, Button } from "react-native-paper";
import db from "../firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";

export default function ChatMain() {
	const [matches, setMatches] = useState([]);
	const [users, setUsers] = useState([]);
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

	useEffect(
		() =>
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
			),
		[currentUser]
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../assets/capstone_bg.gif")}
				style={styles.bgImage}
			>
				<Text>
					{users.map((user) => {
						if (user.uid === currentUser.uid) {
							return user.name;
						}
					})}
				</Text>
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
	button: {
		marginTop: 20,
	},
	heading: {
		alignSelf: "center",
	},
	bgImage: {
		flex: 1,
		justifyContent: "center",
		height: "100%",
		width: "100%",
		resizeMode: "stretch",
		padding: 0,
		margin: 0,
	},
});
