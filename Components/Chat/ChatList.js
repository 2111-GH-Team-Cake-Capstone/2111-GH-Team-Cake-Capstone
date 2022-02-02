import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import db from "../../firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";

export default function ChatList() {
	const [matches, setMatches] = useState([]);

	useEffect(() => {
		// onSnapshot(query(collection(db, "matches"), where()));
	}, []);

	return (
		<View>
			<Text>Chatlist...</Text>
		</View>
	);
}
