import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Modal, Pressable, Image } from "react-native";
import { Button, Avatar, Headline } from "react-native-paper";

const MatchModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
    }}>
      <View style={styles.centeredView}> 
        <View style={styles.modalView}>
          <Headline style={{fontWeight: "bold", marginVertical: '5%'}}>Puppy Love!</Headline>
          <Text style={{fontSize: 14}}>Cannoli and Zelda have matched</Text>
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
          <Button>
            Message Zelda
          </Button>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
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
    alignSelf: "center"
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