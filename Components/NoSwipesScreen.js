import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button, Headline } from "react-native-paper";
import { useFonts } from 'expo-font';

export default function NoSwipesScreen({navigation}) {
  const handleExit = () => {
   navigation.goBack();
   navigation.navigate("EditProfile")
  }
  const [loaded] = useFonts({
    Lobster: require('../assets/fonts/LobsterTwo-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
      <View style={styles.centeredView}>
        <ImageBackground
       source={require("../assets/capstone_bg.gif")}
       style={styles.bgImage}>
        <View>
        <Headline style={styles.noSwipesHeadline}>You've run out of users to swipe!</Headline>
        <Text style={styles.noSwipesText}>Come back later or <Text style={styles.link} onPress={() => handleExit()}>update</Text> your city to browse more users.</Text>
      </View>
      </ImageBackground> 
      </View>
    )   
} 

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  link: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#995768",
  },
  noSwipesText: {
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: '5%'
  },
  noSwipesHeadline: {
    fontFamily: 'Lobster',
    color: "#995768",
    marginTop: 220,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: '5%'
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  }
})