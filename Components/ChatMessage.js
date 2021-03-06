import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	ImageBackground,
	FlatList,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { useDog } from "../context/DogContext";
import ChatReceiverMessage from "./ChatReceiverMessage";
import ChatSenderMessage from "./ChatSenderMessage";
import db from "../firebase";

export default function ChatMessage(props) {
	const currentDog = useDog();
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	const user = props.route.params.user;
	const match = props.route.params.match;

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

		[user, db]
	);

	const sendMessage = async (evt) => {
		evt.preventDefault();

		input.length > 0
			? await addDoc(collection(db, "matches", match.id, "messages"), {
					timestamp: serverTimestamp(),
					sender: currentDog.uid,
					message: input,
			  })
			: null;

		setInput("");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
			keyboardVerticalOffset={Platform.OS === "ios" ? 100 : "65%"}
		>
			<ImageBackground
				source={require("../assets/capstone_bg.gif")}
				style={styles.bgImage}
			>
				<TouchableWithoutFeedback
					onPress={Keyboard.dismiss}
					style={styles.container}
				>
					<FlatList
						data={messages}
						inverted={-1}
						style={{ paddingLeft: 4 }}
						keyExtractor={(item) => item.id}
						renderItem={({ item: message }) =>
							message.sender === currentDog.uid ? (
								<ChatSenderMessage key={message.id} message={message} />
							) : (
								<ChatReceiverMessage
									key={message.id}
									message={message}
									user={user}
								/>
							)
						}
					/>
				</TouchableWithoutFeedback>

				<View>
					<TextInput
						style={styles.textInput}
						placeholder="Message..."
						mode="flat"
						multiline
						editable
						value={input}
						onChangeText={setInput}
						onSubmitEditing={sendMessage}
					/>
					<Button onPress={sendMessage} title="Send">
						Send
					</Button>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>
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
		backgroundColor: "white",
		height: 50,
		margin: 5,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "grey",
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
