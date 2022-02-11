import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, unstable_batchedUpdates } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import db from '../firebase.js';

export default function TinderCard(props) {
    return (
      <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Cover style={styles.picture} source={{uri: props.user.picture}} />
            <Card.Content>
              <View style={styles.topLine}>
              <Text style={styles.title}>{props.user.name}, {props.user.age}</Text>
              <Text style={styles.link} onPress={() => props.navigation.navigate("MatchProfile", { user: props.user})}>View Profile</Text>
              </View>
              <Paragraph style={styles.breed}>{props.user.breed}</Paragraph>
              <Paragraph style={styles.bio}>"{props.user.bio}"</Paragraph>
            </Card.Content>
          </Card>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'transparent'
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  card: {
    bottom: "15%",
    height: 450,
    width: 300,
    backgroundColor: "#f6f6f6",
  },
  picture: {
    height: "60%",
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bio: {
    top: "5%",
    fontSize: 16,
    fontStyle: "italic",
  },
  breed: {
    top: "2%",
    fontSize: 14,
  },
  viewButton: {
    top: "10%",
    paddingLeft: "45%"
  },
  link: {
    fontWeight: "bold",
    fontSize: 16,
    top: "1%",
    color: "#8D6CB3",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  }
});
