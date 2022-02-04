import { Appbar } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function CustomNavigationBar({ route, navigation, back }) {
  const toProfile = () => navigation.navigate("ViewProfile");
  const toBrowseUsers = () => navigation.navigate("BrowseUsers");
  const toChat = () => navigation.navigate("BrowseUsers");
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
        icon="account-circle"
        onPress={toProfile}
        disabled={!!(route.name === "Profile")}
      />
      <Appbar.Action
        icon="dog"
        onPress={toBrowseUsers}
        disabled={!!(route.name === "BrowseUsers")}
      />
      <Appbar.Action
        icon="chat"
        onPress={toChat}
        disabled={!!(route.name === "ChatList")}
      />
      <Appbar.Action icon="logout" onPress={handleLogout} />
    </Appbar.Header>
  );
}
