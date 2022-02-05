import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable } from "react-native";
import Swiper, { onSwipedLeft, onSwipedRight } from 'react-native-deck-swiper';
import Icon from 'react-native-ico';
import TinderCard from './TinderCard';
import { collection, doc, getDocs, snapshot, query, where, addDoc, updateDoc, getDoc } from "firebase/firestore"; 
import db from '../firebase.js';
import { useFirebaseAuth } from "../context/FirebaseAuthContext";

const iconHeight = 75;
const iconWidth = 75;

// 

//grabbing user collection from our database
const usersCollectionRef = collection(
  db,
  'users'
);

//creating swiper reference for buttons
const swiperRef = React.createRef();

export default function BrowseUsers({navigation}) {
  const currentUser = {
    id: "CJnHpheCmf9UyqYP4RtV",
    name: "Zelda",
    city_location: "New York City",
    swipes: ["ThVYa5ykI6VubgIHxEZ1", "AjgLmtGHd9JeJM6YDqOQ"]
  }
  const [users, setUsers] = useState([]);
  // const currUser = useFirebaseAuth(); 

  useEffect(async () => {
    let allUsers = []
    // get all docs in the users collection where city = current user's city
    const localUsers = query(usersCollectionRef, (where("city_location", "==", currentUser.city_location)))
    getDocs(localUsers)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if(doc.id !== currentUser.id && !currentUser.swipes.includes(doc.id)) {
            allUsers.push({ ...doc.data(), id: doc.id })
          }
        })
        setUsers(allUsers);
      })
  }, []);

  // //functions to handle swipes - 

  // //NEED TO ADD IN CHECK TO SEE IF SWIPE DOCUMENT BETWEEN THESE TWO USERS EXISTS
  // const swipeLeft = (cardIndex) => {
  //   //swiped user is the current user dispayed on the card
  //   const swipedUser = users[cardIndex];
  //   const existingSwipesCollection = query(swipesCollectionRef, where("dog_b", "==", "CJnHpheCmf9UyqYP4RtV"));
  //   if(existingSwipesCollection.length) {
  //     updateDoc(existingSwipesCollection[0], {
  //       dog_b_liked: false,
  //       dog_b_swiped: true
  //     });
  //     return;
  //   }
  //   else {
  //     //adding a new swiped document where our current dog is dog_a and swipedUser is dog_b
  //     addDoc(swipesCollectionRef, {
  //       dog_a: "CJnHpheCmf9UyqYP4RtV",
  //       dog_b: swipedUser.id,
  //       dog_a_swiped: true,
  //       dog_a_liked: false
  //     });
  //     return;
  //   }
  // }

  // const swipeRight = (cardIndex) => {
  //   const swipedUser = users[cardIndex]
  // }

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
         ref={swiperRef}
         cards={users}
         renderCard={(card) => {
           return (
             <View style={styles.cardStack}>
              <TinderCard user={card} navigation={navigation}/>
            </View>
           )
         }}
         cardIndex={0}
        //  onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
        //  onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
         stackSize= {3}
         stackSeparation={15}
         animateCardOpacity
         verticalSwipe={false}
         overlayLabels={{
           left: {
             title: "NO",
             style: {
               label: {
                 backgroundColor: "#F72119",
                 color: "white",
                 fontSize: 20
               },
               wrapper: {
                 flexDirection: "column",
                 alignItems: "flex-end",
                 justifyContent: "flex-start",
               }
             }
           },
           right: {
            title: "YES",
            style: {
              label: {
                backgroundColor: "chartreuse",
                color: "white",
                fontSize: 20
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }
            }
           }
         }}
       />
       <View style={styles.icons}>
         <Pressable onPress={()=> swiperRef.current.swipeLeft()}>
          <Icon name="cancel-button" group="material-design" height={iconHeight} width={iconWidth} color="#F72119"/>
        </Pressable>
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
      flex: .95,
      alignItems: "center",
      justifyContent: "center",
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
