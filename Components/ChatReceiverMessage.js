import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Text } from "react-native-paper";

export default function ChatReceiverMessage({ message, user }) {
	const getFirebaseTimeStamp = message.timestamp.toDate();
	const convertedTimestamp = new Date(getFirebaseTimeStamp);

	const year = convertedTimestamp.getFullYear();
	const month = convertedTimestamp.getMonth() + 1;
	const day = convertedTimestamp.getDate();
	const hour =
		convertedTimestamp.getHours() == 0
			? "12"
			: convertedTimestamp.getHours() > 12
			? convertedTimestamp.getHours() - 12
			: convertedTimestamp.getHours();
	const minutes =
		convertedTimestamp.getMinutes() < 10
			? `0${convertedTimestamp.getMinutes()}`
			: convertedTimestamp.getMinutes();
	const aMpM = convertedTimestamp.getHours() < 12 ? "AM" : "PM";

	const messageTimestamp = `${month}/${day}/${year} ${hour}:${minutes} ${aMpM}`;

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
				<Text style={styles.name}>
					{user.name} {messageTimestamp}
				</Text>

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
		backgroundColor: "#A96AC4",
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
