
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import db from '../firebase.js';

export default function TinderCard({navigation}) {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const usersCollectionRef = collection(
      db,
      'users'
    );

    const info = onSnapshot(usersCollectionRef, async () => {
      const userDocs = await getDocs(usersCollectionRef);
      const userData = userDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userData);
    });
    return info;
  }, []);
  if(users.length <= 0) {
    return (
      <Text>loading...</Text>
    )
  }
    return (
      <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Cover style={styles.picture} source={require('../assets/placeholder.jpg')} />
            <Card.Content>
              <Title style={styles.title}>{users[0].name}</Title>
              <Paragraph style={styles.bio}>{users[0].bio}</Paragraph>
              <Paragraph style={styles.breed}>{users[0].breed}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.viewButton}>
              <Button icon="dog" onPress={() => navigation.navigate("MatchProfile")}>View Profile</Button>
            </Card.Actions>
          </Card>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    top: "10%",
    alignSelf: "center",
    height: "65%",
    width: "75%",
    backgroundColor: "#f6f6f6",
  },
  picture: {
    height: "70%",
    width: "100%",
    alignSelf: "center",
  },
  title: {
    top: "10%",
    fontSize: 26,
    fontWeight: "bold",
  },
  bio: {
    top: "10%",
    fontSize: 18,
    fontStyle: "italic",
  },
  breed: {
    top: "10%",
    fontSize: 16,
  },
  viewButton: {
    justifyContent: "flex-end",

  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },
});


