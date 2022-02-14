import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import Moment from "react-moment";
import moment from "moment/min/moment-with-locales";

export default function ChatReceiverMessage({ message, user }) {
	Moment.globalMoment = moment;
	Moment.globalFormat = "MM/DD/YYYY hh:mm a";

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
					{user.name}{" "}
					<Moment element={Text}>{message.timestamp?.toDate()}</Moment>
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
		marginRight: 40,
		color: "white",
		fontSize: 17,
	},
});
