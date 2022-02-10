import { Appbar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useDog } from "../context/DogContext";
import { Alert } from "react-native";

export default function CustomNavigationBar({ route, navigation, back }) {
  const currentDog = useDog();
  console.log("currentDog", typeof currentDog, currentDog);

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

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Leashed" />
      <Appbar.Action
        icon="dog"
        onPress={toProfile}
        disabled={!!(route.name === "ViewProfile")}
      />
      {!currentDog.name ? (
        <Appbar.Action
          icon="heart"
          onPress={() => Alert.alert("Put your user info")}
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
