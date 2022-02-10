import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { Headline, Button, TextInput, HelperText} from 'react-native-paper';
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         onAuthStateChanged
        } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import db, { auth } from '../firebase';
import { useFirebaseAuth } from "../context/FirebaseAuthContext"

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("")

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("ViewProfile");
      }
    });
    return unsubscribe;
  }, [])

  async function handleSignup(){
    try {
      const createdUser =  await createUserWithEmailAndPassword(auth, email, password)
      // Signed in
      const user = createdUser.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        swipes: [],
        potential_matches: [],
        picture: "placeholder.jpg"
      });
      navigation.replace("EditProfile")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode);
    }
  }

  async function handleLogin (){
    try {
      const loggedInUser =  await signInWithEmailAndPassword(auth, email, password)
      // Signed in
      const user = loggedInUser.user;
      navigation.replace("Home")
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode);
    }
  }
  return (
    <KeyboardAvoidingView enabled={Platform.OS === "ios"}
      style={styles.container}>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <Headline style={styles.heading}>Leashed Logo</Headline>
        <TextInput
            style={styles.input}
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
        />
        <HelperText type="error" visible={!!error}>Error: {error.slice(5).replace(/-/g, " ")}</HelperText>
        <Button style={styles.input} mode="contained" onPress={() => handleSignup()}>
          sign up
        </Button>
        <Button style={styles.input} mode="outlined" onPress={() => handleLogin()}>
          Log in
        </Button>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    margin: 12,
  },
  heading: {
    alignSelf: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },
});
