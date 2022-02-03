import { StyleSheet, View } from "react-native";
import { Headline, Button } from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Headline>Welcome to Leashed!</Headline>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("ViewProfile")}
      >
        Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
