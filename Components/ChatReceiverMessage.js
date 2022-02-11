import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Text } from "react-native-paper";

export default function ChatReceiverMessage({ message, user }) {
	console.log(message);

	return (
		<View style={styles.container}>
			{user.picture ? (
				<Avatar.Image
					size={55}
					source={{
						uri: user.picture,
					}}
				/>
			) : (
				<Avatar.Image size={55} source={require("../assets/placeholder.jpg")} />
			)}

			<View style={styles.receiverMessageContainer}>
				<Text style={styles.name}>{user.name}</Text>
				<Text style={styles.name}>{message.timestamp.seconds}</Text>
				<Text style={styles.receiverMessage}>{message.message}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	receiverMessageContainer: {
		flexShrink: 1,
	},
	name: {
		marginLeft: 5,
		color: "black",
		fontSize: 10,
	},
	receiverMessage: {
		backgroundColor: "#A06ADD",
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 20,
		borderRadius: 15,
		padding: 10,
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		color: "white",
		fontSize: 17,
	},
});
