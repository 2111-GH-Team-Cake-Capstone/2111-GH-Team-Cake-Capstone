import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Modal, Pressable, Image } from "react-native";
import { Button, Avatar, Headline } from "react-native-paper";
import { useFonts } from 'expo-font';

const MatchModal = (props) => {
  const swipedUser = props.route.params.swipedUser;
  const currentUser = props.route.params.currentUser;

  const handleExit = () => {
    props.navigation.goBack();
    props.navigation.navigate("BrowseUsers")
  }
  const handleMessage = () => {
    props.navigation.goBack();
    props.navigation.navigate("ChatMain")
  }
  const [loaded] = useFonts({
    Lobster: require('../assets/fonts/LobsterTwo-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.centeredView}> 
        <View style={styles.modalView}>
          <Headline style={styles.headline}>Puppy Love!</Headline>
          <Text style={{textAlign: "center", fontSize: 16}}>{currentUser.name} and {swipedUser.name} have matched</Text>
          <View style={styles.avatars}>
            <Avatar.Image
                size={120}
                source={{uri: currentUser.picture}}
              />
              <Avatar.Image
                size={120}
                source={{uri: swipedUser.picture}}
              />
          </View>
          <Text style={styles.link} onPress={() => handleMessage()}>
            Message {swipedUser.name}
          </Text>
          <Text style={styles.link} onPress={() => handleExit()}>
            Exit
            </Text>
        </View>
      </View>
    </Modal> 
    )   
} 

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  link: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#995768",
    alignSelf: "center",
    marginVertical: "3%"
  },
  modalView: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
  },
  headline: {
    textAlign: "center",
    fontFamily: 'Lobster',
    color: "#995768",
    marginVertical: '5%'
  },
  avatars: {
    position: "relative",
    marginVertical: "10%",
    marginHorizontal: "10%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly"
  } 
})
export default MatchModal;