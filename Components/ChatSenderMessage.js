import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ChatSenderMessage({ message }) {
	return (
		<View style={styles.senderMessage}>
			<Text style={styles.text}>{message.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	senderMessage: {
		alignSelf: "flex-start",
		marginLeft: "auto",
		backgroundColor: "#f04c64",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 20,
		borderRadius: 15,
		padding: 10,
		margin: 5,
	},
	text: {
		color: "white",
		fontSize: 17,
	},
});
