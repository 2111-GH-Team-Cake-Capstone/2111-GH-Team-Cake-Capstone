import { StyleSheet, ScrollView, View, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  Avatar,
  Text,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import db from "../firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import defaultImage from "../assets/placeholder.jpg";

const ViewProfile = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [users, setUsers] = useState([]);
  const currentUser = useFirebaseAuth();

  useEffect(() => {
    const getUsers = async () => {
      const usersColRef = collection(db, "users");
      const usersData = await getDocs(usersColRef);

      setUsers(
        usersData.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getUsers();
  }, []);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Alert> No Access to Internal Storage</Alert>;
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <Avatar.Image size={160} source={{ uri: image }} />

            <Button
              icon="dog"
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
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.name;
                  }
                })}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Breed
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.breed;
                  }
                })}
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
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.age;
                  }
                })}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Weight (lbs)
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.weight;
                  }
                })}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                City
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.city_location;
                  }
                })}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Biography
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {users.map(user => {
                  if (user.uid === currentUser.uid) {
                    return user.bio;
                  }
                })}
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
    width: "100%",
    height: "100%",
  },
});

export default ViewProfile;
