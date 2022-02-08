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

import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase";
import { useDog } from "../context/DogContext";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

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
  const [city_location, setCity] = useState(currentDog.city_location);
  const [name, setName] = useState(currentDog.name);
  const [breed, setBreed] = useState(currentDog.breed);
  const [age, setAge] = useState(String(currentDog.age));
  const [weight, setWeight] = useState(String(currentDog.weight));
  const [bio, setBio] = useState(currentDog.bio);
  const [url, setUrl] = useState(null);

  // Accessing the library of the current device
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  // Pick the image from the library with uri info and set the avatar with the picked image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let response = await fetch(result.uri);

    let photoBlob = await response.blob();
    console.log("photoBlob", photoBlob);

    if (!result.cancelled) {
      setImage(photoBlob);
    }
  };

  if (hasGalleryPermission === false) {
    return <Alert> No Access to Internal Storage</Alert>;
  }

  const handlePublish = e => {
    const imageREf = ref(storage, "image");
    uploadBytes(imageREf, image)
      .then(() => {
        getDownloadURL(imageREf)
          .then(url => {
            setImage(url);
          })
          .catch(error => {
            console.log("getting image url error", error);
          });
      })
      .catch(error => console.log("upload error", error));
  };
  // const handlePublish = e => {
  //   if (!name || !age || !breed || !gender || !city_location) {
  //     Alert.alert("Please fill out all the * fields");
  //     return;
  //   }
  //   const storageRef = ref(
  //     storage,
  //     `/profile_images/${Date.now()}${image.name}`
  //   );

  //   const uploadImage = uploadBytesResumable(storageRef, image);

  //   uploadImage.on(
  //     "state_changed",
  //     snapshot => {
  //       const progressPercent = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progressPercent);
  //     },
  //     err => {
  //       console.log("UploadImageon Error", err);
  //     },

  //     () => {
  //       setName({ name, name });

  //       getDownloadURL(uploadImage.snapshot.ref)
  //         .then(url => {
  //           const dogref = collection(db, "users");
  //           addDoc(dogref, {
  //             image: url,
  //           }).then(() => console.log("Image added successfully"));
  //           setProgress(0);
  //         })
  //         .catch(err => {
  //           console.log("Error", err);
  //         });
  //     }
  //   );
  // };

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
            onChange={e => setGender(e)}
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
            value={city_location}
            onChange={e => {
              setCity(e);
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
          />

          <TextInput
            mode="outlined"
            label="*Age"
            value={age}
            onChangeText={e => handleChange(e)}
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
          />

          <Button
            mode="contained"
            onPress={e => handlePublish(e)}
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
