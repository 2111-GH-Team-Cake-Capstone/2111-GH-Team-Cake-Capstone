import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from "react-native";
import Icon from 'react-native-ico';
import TinderCard from './TinderCard';
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import db from '../firebase.js';

const iconHeight = 75;
const iconWidth = 75;


export default function BrowseUsers( {navigation} ) {
  // const [users, setUsers] = useState([]);

  // useEffect(async () => {
  //   const usersCollectionRef = collection(
  //     db,
  //     'users'
  //   );

  //   const info = onSnapshot(usersCollectionRef, async () => {
  //     const userDocs = await getDocs(usersCollectionRef);
  //     const userData = userDocs.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setUsers(userData);
  //   });
  //   return info;
  // }, []);
  // if(users.length > 0) {
  //   console.log('HEREEEEEE', users[0].name)
  // }

  return (
     <View style={styles.container}>
       <ImageBackground
       source={require("../assets/capstone_bg.gif")}
       style={styles.bgImage}>
       <TinderCard navigation={navigation}/>
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
        alignItems: 'center',
        justifyContent: 'center',
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
