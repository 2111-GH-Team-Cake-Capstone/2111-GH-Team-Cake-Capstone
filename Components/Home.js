import * as React from 'react';
import { StyleSheet, View, ImageBackground } from "react-native";
import { Headline, Button, Subheading } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useFonts } from 'expo-font';

export default function Home({ navigation }) {
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

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <Headline style={styles.heading}>
          Welcome to Leashed!
        </Headline>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate("ViewProfile")}
        >
          Profile
        </Button>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleLogout()}
        >
          Logout
        </Button>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    marginLeft: "30%",
    marginRight: "30%",
  },
  heading: {
    alignSelf: "center",
    color: "#995768",
    fontFamily: 'Lobster',
    fontSize: 40,
    padding: "5%"
  },
  bgImage: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },
});
