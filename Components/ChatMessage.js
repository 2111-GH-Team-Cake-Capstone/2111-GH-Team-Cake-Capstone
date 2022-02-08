import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
	StyleSheet,
	View,
	ImageBackground,
	Text,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import db from "../firebase";

export default function ChatMessage() {
	const currentUser = useFirebaseAuth();
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const { params } = useRoute();

	const { match } = params;
	console.log("MATCH PARAMS", match);

	useEffect(
		() =>
			onSnapshot(
				query(
					collection(db, "matches", match.id, "messages"),
					orderBy("timestamp", "desc")
				),

				(snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),

		[match, db]
	);
	console.log("TIFF MESSAGES LOOK HERE!!!", messages);

	// const sendMessage = async (err) => {
	// err.preventDefault()
	// 	await addDoc(collection(db, "matches", currentUser.uid))
	// }

	return (
		<View>
			{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
			<FlatList
				data={messages}
				inverted={-1}
				keyExtractor={(item) => item.id}
				renderItem={({ item: message }) =>
					message.sender === currentUser.uid ? (
						<Text>{message.message}</Text>
					) : (
						// <SenderMessage key={message.id} message={message} />
						<Text>{message.message}</Text>
						// <ReceiverMessage key={message.id} message={message} />
					)
				}
			/>
			{/* </TouchableWithoutFeedback> */}

			<TextInput
				label="Send message..."
				mode="outlined"
				value={input}
				onChangeText={setInput}
			/>
		</View>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// 	button: {
// 		marginTop: 20,
// 		marginLeft: "30%",
// 		marginRight: "30%",
// 	},
// 	heading: {
// 		alignSelf: "center",
// 	},
// 	bgImage: {
// 		flex: 1,
// 		justifyContent: "center",
// 		height: "100%",
// 		width: "100%",
// 		resizeMode: "stretch",
// 		padding: 0,
// 		margin: 0,
// 	},
// });
