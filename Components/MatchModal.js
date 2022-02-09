import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Modal, Pressable, Image } from "react-native";
import { Button, Avatar, Headline } from "react-native-paper";

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
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.centeredView}> 
        <View style={styles.modalView}>
          <Headline style={{textAlign: "center", fontWeight: "bold", marginVertical: '5%'}}>Puppy Love!</Headline>
          <Text style={{textAlign: "center", fontSize: 14}}>{currentUser.name} and {swipedUser.name} have matched</Text>
          <View style={styles.avatars}>
            <Avatar.Image
                size={120}
                source={require("../assets/placeholder.jpg")}
              />
              <Avatar.Image
                size={120}
                source={require("../assets/ZeldaTinderPic.jpg")}
              />
          </View>
          <Button onPress={() => handleMessage()}>
            Message {swipedUser.name}
          </Button>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => handleExit()}>
            <Text style={{textAlign: "center", marginVertical:"5%"}}>Exit</Text>
          </Pressable>
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