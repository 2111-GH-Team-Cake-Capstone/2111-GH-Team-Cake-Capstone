import React from "react";
import { SafeAreaView, Text } from "react-native";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";

export default function ChatScreen() {
	return (
		<SafeAreaView>
			<ChatHeader title="Chat" />
			<ChatList />
		</SafeAreaView>
	);
}
