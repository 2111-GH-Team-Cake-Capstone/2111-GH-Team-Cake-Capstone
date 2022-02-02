import React from "react";
import { SafeAreaView, Text } from "react-native";
import ChatHeader from "./ChatHeader";

export default function ChatScreen() {
	return (
		<SafeAreaView>
			<ChatHeader title="Chat" />
		</SafeAreaView>
	);
}
