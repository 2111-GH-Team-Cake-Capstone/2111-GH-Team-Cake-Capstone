import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import { Headline, Button, TextInput } from 'react-native-paper';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleSubmit (){
     const createdUser =  await createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    // // Signed in
    // const user = userCredential.user;
    console.log("USER", createdUser)
    // })
    // .catch((error) => {
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // ..
    // });
  }
  return (
    <KeyboardAvoidingView enabled={Platform.OS === "ios"}
      style={styles.container} behavior="padding">
        <Headline style={styles.heading}>Leashed</Headline>
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
        <Button style={styles.input} mode="contained" onPress={() => handleSubmit()}>
          sign up
        </Button>
        <Button style={styles.input} mode="outlined" onPress={() => navigation.navigate('Home')}>
          Log in
        </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  input: {
    margin: 12,
  },
  heading: {
    alignSelf: 'center',
  },
});
