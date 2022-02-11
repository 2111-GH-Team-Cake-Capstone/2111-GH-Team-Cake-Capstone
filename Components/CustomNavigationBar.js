import * as React from 'react';
import { Appbar, Text } from "react-native-paper";
import { StyleSheet } from 'react-native';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDog } from "../context/DogContext";
import { Alert } from "react-native"
import { useFonts } from 'expo-font';


export default function CustomNavigationBar({ route, navigation, back }) {
  const currentDog = useDog();

  const toProfile = () => navigation.navigate("ViewProfile");
  const toBrowseUsers = () => navigation.navigate("BrowseUsers");
  const toChat = () => navigation.navigate("ChatMain");
  async function handleLogout() {
    try {
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.log("signout error", error);
    }
  }

  const [loaded] = useFonts({
    Lobster: require('../assets/fonts/LobsterTwo-Bold.ttf'),
  });

  if (!loaded || !currentDog) {
    return null;
  }

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={<Text style={styles.text}>Leashed</Text>} />
      <Appbar.Action
        icon="dog"
        onPress={toProfile}
        disabled={!!(route.name === "ViewProfile")}
      />
      {!currentDog.name ? (
        <Appbar.Action
          icon="heart"
          onPress={() => Alert.alert("Please complete your profile")}
          disabled={!!(route.name === "BrowseUsers")}
        />
      ) : (
        <Appbar.Action
          icon="heart"
          onPress={toBrowseUsers}
          disabled={!!(route.name === "BrowseUsers")}
        />
      )}

      <Appbar.Action
        icon="chat"
        onPress={toChat}
        disabled={!!(route.name === "ChatMain")}
      />
      <Appbar.Action icon="logout" onPress={handleLogout} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontFamily: 'Lobster',
    fontSize: 25,
  }
});
