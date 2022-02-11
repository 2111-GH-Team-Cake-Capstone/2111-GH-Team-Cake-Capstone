import React, { useState } from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button, Headline } from "react-native-paper";

export default function NoSwipesScreen({navigation}) {
  const handleExit = () => {
   navigation.goBack();
   navigation.navigate("EditProfile")
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
    color: "#8D6CB3",
  },
  noSwipesText: {
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: '5%'
  },
  noSwipesHeadline: {
    fontFamily: 'Lobster',
    color: "#8D6CB3",
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