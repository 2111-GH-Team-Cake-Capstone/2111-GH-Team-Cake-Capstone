import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
	FlatList,
	TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
	collectionGroup,
} from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import db from "../firebase";

export default function ChatMessage() {
	const currentUser = useFirebaseAuth();
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState({});
	const { params } = useRoute();

	const { match } = params;
	// console.log(match);

	useEffect(() => {
		const messagesQuery = async () => {
			const messagesCol = collectionGroup(db, "messages");

			const querySnapshot = await getDocs(messagesCol);
			querySnapshot.forEach((doc) => {
				setMessages(doc.data());
			});
		};

		messagesQuery();
	});

	// console.log(messages);

	// const sendMessage = async (err) => {
	// err.preventDefault()
	// 	await addDoc(collection(db, "matches", currentUser.uid))
	// }

	return (
		<View>
			{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<FlatList
					data={messages}
					inverted={-1}
					keyExtractor={(item) => item.id}
					renderItem={({ item: message }) =>
						message.userId === currentUser.uid ? (
							<SenderMessage key={message.id} message={message} />
						) : (
							<ReceiverMessage key={message.id} message={message} />
						)
					}
				/>
			</TouchableWithoutFeedback> */}

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
