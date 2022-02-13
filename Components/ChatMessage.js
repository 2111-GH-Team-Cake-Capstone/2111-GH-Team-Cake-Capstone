import React, { useState, useEffect } from "react";
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
	Dimensions
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

	// console.log("MATCH PARAMS", match);
	// console.log("USER PARAMS", user);
	// console.log("CURRENT DOG", currentDog);

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
	// console.log("TIFF MESSAGES LOOK HERE!!!", messages);

	const sendMessage = (evt) => {
		evt.preventDefault();

		addDoc(collection(db, "matches", match.id, "messages"), {
			timestamp: serverTimestamp(),
			sender: currentDog.uid,
			message: input,
		});

		setInput("");
	};

	return (
		<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={{ flex: 1 }}
				keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 170}
		>
			<SafeAreaView style={styles.container}>
				<ImageBackground
					source={require("../assets/capstone_bg.gif")}
					style={styles.bgImage}
				>

						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<FlatList
								data={messages}
								inverted={-1}
								style={{ paddingHorizontal: 4 }}
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
				</ImageBackground>
			</SafeAreaView>
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
