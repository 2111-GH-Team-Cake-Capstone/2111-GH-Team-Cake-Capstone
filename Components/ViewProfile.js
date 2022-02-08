import { StyleSheet, ScrollView, View, ImageBackground } from "react-native";
import { Button, Avatar, Card, Title, Paragraph } from "react-native-paper";
import { useDog } from "../context/DogContext";

const ViewProfile = ({ navigation }) => {
  const currentDog = useDog();

  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/capstone_bg.gif")}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <Avatar.Image size={160} source={{ uri: currentDog.picture }} />

            <Button
              icon="dog"
              onPress={() => navigation.navigate("BrowseUsers")}
            >
              Browse Users
            </Button>
            <Button
              icon="message-processing"
              onPress={() => navigation.navigate("ChatMain")}
            >
              Message
            </Button>
          </View>
          <Card
            style={{ alignItems: "center", marginTop: 10, textAlign: "center" }}
          >
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Name
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.name}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Breed
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.breed}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Age
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.age}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Weight (lbs)
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.weight}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                City
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.city}
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{ textAlign: "center", fontWeight: "bold" }}>
                Biography
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                {currentDog.bio}
              </Paragraph>
            </Card.Content>
          </Card>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("EditProfile")}
            style={{
              width: 100,
              marginTop: 10,
              left: 120,
            }}
          >
            Edit
          </Button>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  bgImage: {
    width: "100%",
    height: "100%",
  },
});

export default ViewProfile;
