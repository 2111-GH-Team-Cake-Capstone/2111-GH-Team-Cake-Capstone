import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Alert,
  Dimensions,
} from "react-native";
import { Button, Avatar, TextInput } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase";
import { useDog } from "../context/DogContext";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import uuid from "uuid";
import { updateDoc, doc } from "firebase/firestore";
import db from "../firebase";

const genderData = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
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
  const [city_location, setCity] = useState(currentDog.city_location);
  const [name, setName] = useState(currentDog.name);
  const [breed, setBreed] = useState(currentDog.breed);
  const [age, setAge] = useState(currentDog.age);
  const [weight, setWeight] = useState(currentDog.weight);
  const [bio, setBio] = useState(currentDog.bio);
  const [url, setUrl] = useState(currentDog.picture);
  const [loading, setLoading] = useState(false);
  // Accessing the library of the current device
  useEffect(() => {
    const galleryStatus = async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    };

    galleryStatus();
  }, []);

  const uploadImageAsync = async uri => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), uuid.v4());
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  };

  // Pick the image from the library with uri info and set the avatar with the picked image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    handleImagePicked(result);
  };

  const handleImagePicked = async result => {
    try {
      setLoading(true);

      if (!result.cancelled) {
        // Here we have download URL as uploadURl -> this info has to be stored in our database as picture
        const uploadUrl = await uploadImageAsync(result.uri);
        setImage(uploadUrl);

        // this will set uploadUrl data into url variable
        setUrl(uploadUrl);
      }
    } catch (error) {
      console.log("Upload Image Fail", error);
      Alert.alert("Upload Image failed :(");
    } finally {
      setLoading(false);
    }
  };

  const editUpdate = () => {
    if (!name || !age || !breed || !gender || !city_location || !image) {
      Alert.alert("Please fill out all the * fields");
      return;
    }
    const docRef = doc(db, "users", currentDog.id);

    updateDoc(docRef, {
      name: name,
      age: age,
      breed: breed,
      gender: gender,
      city_location: city_location,
      bio: bio,
      weight: weight,
      picture: url,
    }).then(() => {
      navigation.navigate("ViewProfile");
    });
  };

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image size={180} source={{ uri: image }} />
            <Button onPress={pickImage} title="PickImage" icon="camera">
              <Text>*Select Your Image</Text>
            </Button>
          </View>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={genderData}
            labelField="label"
            valueField="value"
            label="Dropdown"
            placeholder="* Select Your Gender"
            value={gender}
            onChange={e => {
              setGender(e.value);
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
            placeholder="* Select Your City"
            value={city_location}
            onChange={e => {
              setCity(e.value);
            }}
          />
          <TextInput
            mode="outlined"
            label="*Name"
            value={name}
            onChangeText={e => setName(e)}
          />
          <TextInput
            mode="outlined"
            label="*Breed"
            value={breed}
            onChangeText={e => setBreed(e)}
            maxLength={100}
          />

          <TextInput
            mode="outlined"
            label="*Age"
            value={age}
            onChangeText={e => setAge(e)}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            mode="outlined"
            label="Weight (lbs)"
            value={weight}
            keyboardType="numeric"
            onChangeText={e => setWeight(e)}
          />

          <TextInput
            mode="outlined"
            label="Bio"
            value={bio}
            onChangeText={e => setBio(e)}
            maxLength={300}
          />

          <Button
            mode="contained"
            onPress={editUpdate}
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
    </KeyboardAwareScrollView>
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
    marginTop: 10,
    marginBottom: 5,
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
    height: Dimensions.get("window").height,
  },
});
