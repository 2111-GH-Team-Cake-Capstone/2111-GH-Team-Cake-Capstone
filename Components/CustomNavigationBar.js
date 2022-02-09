import { Appbar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function CustomNavigationBar({ route, navigation, back }) {
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
      <Appbar.Action
        icon="heart"
        onPress={toBrowseUsers}
        disabled={!!(route.name === "BrowseUsers")}
      />
      <Appbar.Action
        icon="chat"
        onPress={toChat}
        disabled={!!(route.name === "ChatMain")}
      />
      <Appbar.Action icon="logout" onPress={handleLogout} /*disabled={!!(route.name === "ChatMain")}*//>
    </Appbar.Header>
  );
}
