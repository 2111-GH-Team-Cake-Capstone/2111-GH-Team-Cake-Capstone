import { StyleSheet, Button, View, Text, Alert, Modal, Pressable } from "react-native";
import { Headline } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage"; //access the storage database
import React, { useState } from "react";

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const storage = getStorage(); //the storage itself
    const ref = ref(storage, "image.jpg"); //how the image will be addressed inside the storage

    //convert image to array of bytes
    const img = await fetch(result.uri);
    const bytes = await img.blob();

    await uploadBytes(ref, bytes); //upload images
  }
};



export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
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

      <Headline>Your Profile</Headline>
      <Button onPress={pickImage} title="PickImage" color="#841584">
        <Text> Select Your Image</Text>
      </Button>
      <Button onPress={() => setModalVisible(true)} title="ViewMatch" color="#841584">
        <Text> You have a match!</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
}
});
