import React, { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Headline, Button, TextInput } from "react-native-paper";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";

import { auth, provider } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	const handleSignUp = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("signed up with", user.email);
			})
			.catch((error) => alert(error.message));
	};

	const handleLogin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log("logged in with", user.email);
			})
			.catch((error) => alert(error.message));
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.navigate("Profile");
			}
		});

		return unsubscribe;
	}, []);

	return (
		<KeyboardAvoidingView
			enabled={Platform.OS === "ios"}
			style={styles.container}
			behavior="padding"
		>
			<View>
				<Headline style={styles.heading}>Leashed</Headline>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					mode="outlined"
					label="Password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					secureTextEntry
				/>
			</View>

			<View>
				<Button style={styles.input} mode="contained" onPress={handleSignUp}>
					Sign Up
				</Button>
				<Button style={styles.input} mode="outlined" onPress={handleLogin}>
					Log in
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	input: {
		margin: 12,
	},
	heading: {
		alignSelf: "center",
	},
});
