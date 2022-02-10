import { View, StyleSheet } from "react-native";
import React from "react";
import { useDog } from "../context/DogContext";
import { Avatar, Text } from "react-native-paper";

export default function ChatSenderMessage({ message }) {
	const currentDog = useDog();

	return (
		<View style={styles.container}>
			<View style={styles.senderMessageContainer}>
				<Text style={styles.name}>{currentDog.name}</Text>
				<Text style={styles.senderMessage}>{message.message}</Text>
			</View>

			<Avatar.Image
				size={55}
				source={{
					uri: currentDog.picture,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		marginLeft: "auto",
	},
	senderMessageContainer: {
		flexShrink: 1,
	},
	name: {
		marginLeft: "auto",
		marginRight: 5,
		color: "black",
		fontSize: 10,
	},
	senderMessage: {
		backgroundColor: "#f04c64",
		borderTopRightRadius: 0,
		borderBottomRightRadius: 20,
		borderRadius: 15,
		padding: 10,
		marginBottom: 5,
		marginRight: 5,
		color: "white",
		fontSize: 17,
	},
});
