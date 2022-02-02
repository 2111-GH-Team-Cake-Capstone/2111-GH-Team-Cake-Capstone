import React, { useState } from "react";
import { StyleSheet, Button, View, Text, Alert, Modal, Pressable } from "react-native";

const MatchModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal transparent={true} animationType="slide" visible={modalVisible} onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    setModalVisible(!modalVisible);
    }}>
      <View style={styles.centeredView}> 
        <View style={styles.modalView}>
          <Text style={{fontSize: 20, marginVertical: '5%'}}>Puppy Love!</Text>
          <Text>You and Zelda have matched!</Text>
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
  modalView: {
    margin: 20,
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