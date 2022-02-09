import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
	StyleSheet,
	View,
	ImageBackground,
	FlatList,
	TouchableWithoutFeedback,
	SafeAreaView,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ChatReceiverMessage from "./ChatReceiverMessage";
import ChatSenderMessage from "./ChatSenderMessage";
import db from "../firebase";

// THINGS THAT NEED TO BE COMPLETED:
// 1. Display match name up in header, or display each name directly above every message

export default function ChatMessage() {
	const currentUser = useFirebaseAuth();
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const { params } = useRoute();

	const { match } = params;
	// console.log("MATCH PARAMS", match);

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
	// console.log("TIFF MESSAGES LOOK HERE!!!", messages);

	const sendMessage = (evt) => {
		evt.preventDefault();

		addDoc(collection(db, "matches", match.id, "messages"), {
			timestamp: serverTimestamp(),
			sender: currentUser.uid,
			message: input,
		});

		setInput("");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/capstone_bg.gif")}
				style={styles.bgImage}
			>
				<KeyboardAvoidingView
					enabled={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
					keyboardVerticalOffset={10}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<FlatList
							data={messages}
							inverted={-1}
							style={{ paddingLeft: 4 }}
							keyExtractor={(item) => item.id}
							renderItem={({ item: message }) =>
								message.sender === currentUser.uid ? (
									<ChatSenderMessage key={message.id} message={message} />
								) : (
									<ChatReceiverMessage key={message.id} message={message} />
								)
							}
						/>
					</TouchableWithoutFeedback>

					<View>
						<TextInput
							style={styles.textInput}
							label="Message..."
							mode="outlined"
							value={input}
							onChangeText={setInput}
							onSubmitEditing={sendMessage}
						/>
						<Button onPress={sendMessage} title="Send">
							Send
						</Button>
					</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textInput: {
		height: 50,
		backgroundColor: "white",
	},
	button: {
		marginTop: 20,
		marginLeft: "30%",
		marginRight: "30%",
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
