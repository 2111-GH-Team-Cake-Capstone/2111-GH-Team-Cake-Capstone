import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import db from "../../firebase";
import {
	collection,
	doc,
	getDocFromServer,
	getDocs,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";

// const q = query(collection(db, "matches"), where("dog_b", "==", ));
// console.log(q)

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
// 	console.log(doc.id, "=>", doc.data());
// });

// const q = query(collection(db, "cities"), where("capital", "==", true));

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

export default function ChatList() {
	const [matches, setMatches] = useState("");
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
		const getMatches = async () => {
			const matchesQ = query(
				collection(db, "matches"),
				where("messages", "==", true)
			);
			setMatches(matchesQ);
			// const matchesData = await getDocs(matchesColRef);

			// const querySnapshot = await getDocs(matchesQ);
			// querySnapshot.forEach((doc) => {
			// 	console.log(doc.id, " => ", doc.data());
			// });
		};

		getMatches();
	});

	return (
		<View>
			<Text>
				{users.map((user) => {
					return user.name;
				})}
			</Text>
			<Text>{matches}</Text>
		</View>
	);
}
