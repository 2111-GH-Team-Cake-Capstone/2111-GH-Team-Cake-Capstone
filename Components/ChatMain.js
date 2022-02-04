import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
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
	const [matches, setMatches] = useState();
	const [users, setUsers] = useState([]);
	const currentUser = useFirebaseAuth();
	console.log(currentUser);

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

	// const getMatches = () => {
	// 	return users.map((user) => {
	// 		const q = query(collection(db, "matches"), where("dog_a", "==", user.id));

	// 		const querySnapshot = getDocs(q);
	// 		return querySnapshot;
	// 	});
	// };

	// const matchesDocA = getDocs(db, "matches", "dog_a");
	// const matchesDocB = getDocs(db, "matches", "dog_b");

	// useEffect(() => {
	// 	const getMatches = async () => {
	// 		const matchesColRef = collection(db, "matches");
	// 		const matchesData = await getDocs(matchesColRef);

	// 		setMatches(
	// 			matchesData.docs.map((doc) => ({
	// 				...doc.data(),
	// 				dogA: doc.dog_a,
	// 				dogB: doc.dog_b,
	// 			}))
	// 		);
	// 	};
	// 	getMatches();
	// }, []);

	// useEffect(() => {
	// 	const getMatches = async () => {
	// 		const matchesQ = query(
	// 			collection(db, "matches"),
	// 			where("messages", "==", true)
	// 		);
	// 		setMatches(matchesQ);
	// 		// const matchesData = await getDocs(matchesColRef);

	// 		// const querySnapshot = await getDocs(matchesQ);
	// 		// querySnapshot.forEach((doc) => {
	// 		// 	console.log(doc.id, " => ", doc.data());
	// 		// });
	// 	};

	// 	getMatches();
	// });

	// find matches where either dog_a or dog_b == user.id
	// query both users and matches

	return (
		<View>
			<Text>
				{users.map((user) => {
					if (user.uid) {
						return user.name;
					}
				})}
			</Text>
		</View>
	);
}
