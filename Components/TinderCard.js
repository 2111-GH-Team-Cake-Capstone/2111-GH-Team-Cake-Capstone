import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { collection, doc, getDoc } from "firebase/firestore";
import db from "../firebase.js";

export default function TinderCard() {
	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Card.Cover
					style={styles.picture}
					source={require("../assets/ZeldaTinderPic.jpg")}
				/>
				<Card.Content>
					<Title style={styles.title}>Zelda</Title>
					<Paragraph style={styles.bio}>Just a little love-bug</Paragraph>
					<Paragraph style={styles.breed}>Hound mix</Paragraph>
				</Card.Content>
				<Card.Actions style={styles.viewButton}>
					<Button
						icon="dog"
						onPress={() => navigation.navigate("MatchProfile")}
					>
						View Profile
					</Button>
				</Card.Actions>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		position: "absolute",
		top: "10%",
		alignSelf: "center",
		height: "65%",
		width: "75%",
		backgroundColor: "#f6f6f6",
	},
	picture: {
		height: "70%",
		width: "100%",
		alignSelf: "center",
	},
	title: {
		top: "10%",
		fontSize: 26,
		fontWeight: "bold",
	},
	bio: {
		top: "10%",
		fontSize: 18,
		fontStyle: "italic",
	},
	breed: {
		top: "10%",
		fontSize: 16,
	},
	viewButton: {
		justifyContent: "flex-end",
	},
	bgImage: {
		width: "100%",
		height: "100%",
		resizeMode: "stretch",
		padding: 0,
		margin: 0,
	},
});
