import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-ico';
import TinderCard from './TinderCard';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore"; 
import db from '../firebase.js';

const iconHeight = 75;
const iconWidth = 75;


export default function BrowseUsers({navigation}) {
  const [users, setUsers] = useState([]);
  // const [index, setIndex] = useState(0);

  useEffect(async () => {
    const usersCollectionRef = collection(
      db,
      'users'
    );

    const info = onSnapshot(usersCollectionRef, async () => {
      const userDocs = await getDocs(usersCollectionRef);
      const userData = userDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userData);
    });
    return info;
  }, []);
  if(users.length <= 0) {
    return (
    <Text>loading...</Text>
    )
  }
  return (
     <View style={styles.container}>
       <ImageBackground
       source={require("../assets/capstone_bg.gif")}
       style={styles.bgImage}>
       <Swiper backgroundColor="transparent"
         cards={users}
         renderCard={(card) => {
           return (
             <View style={styles.cardStack}>
              <TinderCard user={card} navigation={navigation}/>
            </View>
           )
         }}
       
       />
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
    cardStack: {
      flex: 5,
      backgroundColor: 'transparent'
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
      bottom: "10%",
    },
    swiper: {
      flex:1,
      backgroundColor: "black"
    }
  })
  