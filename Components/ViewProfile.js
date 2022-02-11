import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, ImageBackground } from "react-native";
import { Button, Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useDog } from "../context/DogContext";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";

const ViewProfile = ({ navigation }) => {
  const currentDog = useDog();
  const [currentUser, setCurrentUser] = useState(null);
  const firebaseUser = useFirebaseAuth();

  useEffect(() => {
    setCurrentUser(firebaseUser);
  }, [firebaseUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", paddingTop: 30 }}>
            <Avatar.Image size={170} source={{ uri: currentDog.picture }} />
            <Button
              icon="heart"
              onPress={() => navigation.navigate("BrowseUsers")}
            >
              Browse Users
            </Button>
            <Button
              icon="message-processing"
              onPress={() => navigation.navigate("ChatMain")}
            >
              Message
            </Button>
          </View>
          <Card
            style={{ alignItems: "center", marginTop: 10, textAlign: "center" }}
          >
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Name
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.name}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Breed
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.breed}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Age
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.age}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Weight (lbs)
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.weight}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                City
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.city_location}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Biography
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.bio}
              </Paragraph>
            </Card.Content>
          </Card>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("EditProfile")}
            style={{
              width: 100,
              marginTop: 10,
              left: 120,
            }}
          >
            Edit
          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
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

export default ViewProfile;
