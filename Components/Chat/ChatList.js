import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import db from "../../firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

export default function ChatList() {
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		onSnapshot(query(collection(db, "matches"), where()));

		// const getMatches = async () => {
		// 	const matchesColRef = collection(db, "matches");
		// 	const matchesData = await getDocs(matchesColRef);

		// 	setMatches(
		// 		matchesData.docs.map((doc) => ({
		// 			...doc.data(),
		// 			id: doc.id,
		// 		}))
		// 	);
		// };

		// getMatches();
	}, []);

	return (
		<View>
			<Text>
				Chatlist...
				{/* {matches.map((match) => {
					return match.dog_a;
				})} */}
			</Text>
		</View>
	);
}
