import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ChatReceiverMessage({ message }) {
	return (
		<View style={styles.receiverMessage}>
			<Text style={styles.text}>{message.message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	receiverMessage: {
		alignSelf: "flex-start",
		backgroundColor: "#A06ADD",
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 20,
		borderRadius: 15,
		padding: 10,
		margin: 5,
	},
	text: {
		color: "white",
		fontSize: 17,
	},
});
