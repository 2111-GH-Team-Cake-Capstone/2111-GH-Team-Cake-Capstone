import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import { Headline, Button, TextInput } from 'react-native-paper';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        <Button style={styles.input} mode="contained" onPress={() => navigation.navigate('Home')}>
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
