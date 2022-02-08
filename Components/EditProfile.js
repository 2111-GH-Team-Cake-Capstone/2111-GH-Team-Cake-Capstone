import React, { useState, useEffect } from "react";
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
import db from "../firebase";

import * as ImagePicker from "expo-image-picker";
import { setDoc } from "firebase/firestore";
import { useDog } from "../context/DogContext";

const genderData = [
  { label: "female", value: "female" },
  { label: "male", value: "male" },
];
const cityData = [
  { label: "Chicago", value: "Chicago" },
  { label: "New York City", value: "New York City" },
  { label: "Seoul", value: "Seoul" },
];

export default function EditProfile({ navigation }) {
  const currentDog = useDog();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(currentDog.picture);
  const [gender, setGender] = useState(currentDog.gender);
  const [city, setCity] = useState(currentDog.city_location);
  const [name, setName] = useState(currentDog.name);
  const [breed, setBreed] = useState(currentDog.breed);
  const [age, setAge] = useState(String(currentDog.age));
  const [weight, setWeight] = useState(String(currentDog.weight));
  const [bio, setBio] = useState(currentDog.bio);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Alert> No Access to Internal Storage</Alert>;
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", paddingTop: 30 }}>
            <Avatar.Image size={120} source={{ uri: image }} />
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
            value={gender}
            onChange={item => {
              setGender(item.value);
            }}
          />
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={cityData}
            search
            searchPlaceholder="Search"
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="Select Your City"
            value={city}
            onChange={item => {
              setCity(item.value);
            }}
          />
          <TextInput
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            mode="outlined"
            label="Breed"
            value={breed}
            onChangeText={text => setBreed(text)}
          />

          <TextInput
            mode="outlined"
            label="Age"
            value={age}
            onChangeText={text => setAge(text)}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            mode="outlined"
            label="Weight (lbs)"
            value={weight}
            keyboardType="numeric"
            onChangeText={text => setWeight(text)}
          />

          <TextInput
            mode="outlined"
            label="Bio"
            value={bio}
            onChangeText={text => setBio(text)}
          />

          <Button
            mode="contained"
            onPress={() => navigation.navigate("ViewProfile")}
            style={{
              width: 100,
              marginTop: 10,
              left: 50,
            }}
          >
            Submit
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("ViewProfile")}
            style={{ width: 100, marginTop: 10, left: 170, bottom: 45 }}
          >
            Cancel
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
