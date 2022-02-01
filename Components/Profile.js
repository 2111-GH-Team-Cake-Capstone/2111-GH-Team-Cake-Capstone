import { StyleSheet, Button, View, Text } from "react-native";
import { Headline } from "react-native-paper";
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

export default function Home() {
  return (
    <View style={styles.container}>
      <Headline>Your Profile</Headline>
      <Button onPress={pickImage} title="PickImage" color="#841584">
        <Text> Select Your Image</Text>
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
});
