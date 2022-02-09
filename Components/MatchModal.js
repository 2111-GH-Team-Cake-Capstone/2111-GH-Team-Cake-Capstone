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
          <Headline style={{fontWeight: "bold", marginVertical: '5%'}}>Puppy Love!</Headline>
          <Text style={{fontSize: 14}}>{currentUser.name} and {swipedUser.name} have matched</Text>
          <View style={styles.avatars}>
            <Avatar.Image
                size={120}
                justifyContent={"float-start"}
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
            <Text style={styles.textStyle}>Exit</Text>
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
  avatars: {
    position: "relative",
    marginVertical: "15%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly"
  },
  modalView: {
    position: "relative",
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    },
    button: {
      marginVertical: 10,
      fontWeight: 'bold',
      color: 'blue'
    },
    
})
export default MatchModal;