import React from 'react';
import { StyleSheet, View, ImageBackground } from "react-native";
import Icon from 'react-native-ico';
import CardStack from 'react-native-card-stack-swiper';
import TinderCard from './TinderCard';

const iconHeight = 75;
const iconWidth = 75;

export default function BrowseUsers() {
  return (
     <View style={styles.container}>
       <ImageBackground
       source={require("../assets/capstone_bg.gif")}
       style={styles.bgImage}>
       <TinderCard />
       <View style={styles.icons}>
        <Icon name="cancel-button" group="material-design" height={iconHeight} width={iconWidth} color="#F72119"/>
        <Icon name="paw-black-shape" group="coolicons" height={iconHeight} width={iconWidth} color="chartreuse"/>
       </View>
       </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    bgImage: {
      width: "100%",
      height: "100%",
      resizeMode: "stretch",
      padding: 0,
      margin: 0,
    },
    icons: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around",
      position: "absolute",
      bottom: "12%",
    },
  })
  