import React from "react";
import { View, Text } from "react-native";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";

export default function ChatScreen() {
	return (
		<View>
			<ChatHeader title="Chat" />
			{/* <ChatList /> */}
		</View>
	);
}
