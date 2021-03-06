import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
} from "react-native";
import {
  Button,
  Avatar,
  TextInput,
  Headline,
  Title,
  Badge,
  Card,
  Paragraph,
} from "react-native-paper";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage"; //access the storage database

export default function MatchProfile(props, { navigation }) {
  const potentialMatch = props.route.params.user;
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image size={200} source={{ uri: potentialMatch.picture }} />
          </View>

          <Card style={styles.card}>
            <Card.Content style={styles.fontContainer}>
              <Title style={{ fontSize: 25 }}>{potentialMatch.name}</Title>
              <Text style={styles.font}>Gender</Text>
              <Text style={{ paddingBottom: 10, fontSize: 16 }}>
                {potentialMatch.gender}
              </Text>
              <Text style={styles.font}>Age</Text>
              <Text style={{ paddingBottom: 10 }}>{potentialMatch.age}</Text>
              <Text style={styles.font}>Breed</Text>
              <Text style={{ paddingBottom: 10, fontSize: 16 }}>
                {potentialMatch.breed}
              </Text>
              <Text style={styles.font}>City</Text>
              <Text style={{ paddingBottom: 10, fontSize: 16 }}>
                {potentialMatch.city_location}
              </Text>
              <Text style={styles.font}>Weight</Text>
              <Text style={{ paddingBottom: 10, fontSize: 16 }}>
                {potentialMatch.weight}
              </Text>
              <Text style={styles.font}>Biography</Text>
              <Text
                style={{ paddingBottom: 10, fontSize: 16, textAlign: "center" }}
              >
                {potentialMatch.bio}
              </Text>
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={() => props.navigation.navigate("BrowseUsers")}
            style={{
              width: 100,
              marginTop: 10,
              left: 95,
            }}
          >
            Back
          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
  },
  card: {
    marginTop: 20,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },

  fontContainer: {
    flex: 1,
    alignItems: "center",
  },
  font: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
