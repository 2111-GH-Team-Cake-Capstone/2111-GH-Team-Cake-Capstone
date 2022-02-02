import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Alert,
  Pressable,
} from "react-native";
import { Button, Avatar, TextInput, Headline } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes } from "firebase/storage"; //access the storage database

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

const genderData = [{ label: "Female" }, { label: "Male" }];

export default function Home({ navigation }) {
  const [dropdown, setDropdown] = useState(null);
  const [selected, setSelected] = useState([]);
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", paddingTop: 30 }}>
            <Avatar.Image
              size={120}
              source={require("../assets/placeholder.jpg")}
            />
            <Button onPress={pickImage} title="PickImage" icon="camera">
              <Text> Select Your Image</Text>
            </Button>
          </View>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={genderData}
            search
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="Select Your Gender"
            value={dropdown}
            onChange={item => {
              setDropdown(item.value);
              console.log("selected", item);
            }}
          />
          <TextInput mode="outlined" label="Name" />
          <TextInput mode="outlined" label="Breed" />

          <TextInput mode="outlined" label="Age" />
          <TextInput mode="outlined" label="Weight (lbs)" />
          <TextInput mode="outlined" label="City" />
          <TextInput
            mode="outlined"
            label="Bio"
            right={<TextInput.Affix text="/300" />}
          />

          <Button
            mode="contained"
            onPress={() => console.log("pressed")}
            style={{
              width: 100,
              marginTop: 10,
              left: 50,
            }}
          >
            Edit
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("TinderCard")}
            style={{ width: 100, marginTop: 10, left: 170, bottom: 45 }}
          >
            Cancel
          </Button>

          <Button
icon="dog"
            mode="contained"
            onPress={() => navigation.navigate("BrowseUsers")}
            style={{ bottom: 30, right: -70, width: 180 }}
          >

          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
    padding: 0,
    margin: 0,
  },
});
