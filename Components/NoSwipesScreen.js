import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Modal } from "react-native";
import { Button, Headline } from "react-native-paper";

const MatchModal = ({navigation}) => {
  const handleExit = () => {
   navigation.goBack();
   navigation.navigate("EditProfile")
  }
  return (
    <Modal transparent={true}>
      <View style={styles.centeredView}> 
        <View style={styles.modalView}>
        <Headline style={styles.noSwipesHeadline}>You've run out of users to swipe!</Headline>
        <Text style={styles.noSwipesText}>Come back later or <Text style={styles.link} onPress={() => handleExit()}>update</Text> your city to browse more users.</Text>
      </View>
      </View>
    </Modal> 
    )   
} 

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    backgroundColor: "transparent",
    width: "80%",
    height: "50%"
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
    marginTop: 220,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: '5%'
  }
})
export default MatchModal;