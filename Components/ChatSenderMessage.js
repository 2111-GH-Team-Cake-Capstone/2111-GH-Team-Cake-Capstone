import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { useDog } from "../context/DogContext";
import { Avatar } from "react-native-paper";
import Moment from "react-moment";
import moment from "moment/min/moment-with-locales";

export default function ChatSenderMessage({ message }) {
	const currentDog = useDog();
	Moment.globalMoment = moment;
	Moment.globalFormat = "MM/DD/YYYY hh:mm a";

	return (
		<View style={styles.container}>
			<View style={styles.senderMessageContainer}>
				<Text style={styles.name}>
					{currentDog.name}{" "}
					<Moment element={Text}>{message.timestamp?.toDate()}</Moment>
				</Text>

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
		marginRight: 5,
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
		textAlign: "right",
		marginLeft: "auto",
	},
});
