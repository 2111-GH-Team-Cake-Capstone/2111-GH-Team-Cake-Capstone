import React, { useState, useEffect } from "react";
import { StyleSheet, View, ImageBackground, Text, Pressable } from "react-native";
import Swiper, { onSwipedLeft, onSwipedRight } from 'react-native-deck-swiper';
import { Headline, Paragraph } from 'react-native-paper';
import Icon from 'react-native-ico';
import TinderCard from './TinderCard';
import { collection, doc, getDocs, snapshot, query, where, addDoc, updateDoc, getDoc, arrayUnion, serverTimestamp } from "firebase/firestore"; 
import db from '../firebase.js';
import { useDog } from "../context/DogContext";
import NoSwipesScreen from "./NoSwipesScreen";

const iconHeight = 75;
const iconWidth = 75;

//grabbing user collection from our database
const usersCollectionRef = collection(
  db,
  'users'
);

const matchesCollectionRef = collection(
  db,
  'matches'
);

//creating swiper reference for buttons
const swiperRef = React.createRef();

export default function BrowseUsers({navigation}) {
  const currentUser = useDog();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    let allUsers = []
    // get all docs in the users collection where city = current user's city
    const localUsers = query(usersCollectionRef, (where("city_location", "==", currentUser.city_location)))
    getDocs(localUsers)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          //adding ONLY the users who are not our current user and not included in our current user's swipes array
          if(doc.id !== currentUser.id && !currentUser.swipes.includes(doc.id)) {
            allUsers.push({ ...doc.data(), id: doc.id })
          }
        })
        setUsers(allUsers);
      })
  }, []);

  // //functions to handle swipes - 
  const swipeLeft = async (cardIndex) => {
    const swipedUser = users[cardIndex];
    const currentUserRef = doc(db, "users", currentUser.id);
    updateDoc(currentUserRef, {
      swipes: arrayUnion(swipedUser.id)
    })
    .then(() => {
      console.log("you swiped left on", swipedUser.name)
    })
  }
  const swipeRight = async (cardIndex) => {
    const swipedUser = users[cardIndex];
    const currentUserRef = doc(db, "users", currentUser.id);
    updateDoc(currentUserRef, {
      swipes: arrayUnion(swipedUser.id),
      potential_matches: arrayUnion(swipedUser.id)
    })
    .then(() => {
      if(swipedUser.potential_matches.includes(currentUser.id)) {
        addDoc(matchesCollectionRef, {
          dog_a: swipedUser.uid,
          dog_b: currentUser.uid,
          matched_at: serverTimestamp()
        })
        navigation.navigate("MatchModal", {
          swipedUser, currentUser
        })
        console.log("it's a match!")
      }
    })
  }
  const noSwipes = () => {
    navigation.replace("NoSwipesScreen")
  }

  if(users.length <= 0) {
    return (
      <NoSwipesScreen navigation={navigation}/>
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
         onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
         onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
         onSwipedAll={() => noSwipes()}
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
        <Pressable onPress={()=> swiperRef.current.swipeRight()}>
          <Icon name="paw-black-shape" group="coolicons" height={iconHeight} width={iconWidth} color="chartreuse"/>
        </Pressable>
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
    link: {
      fontWeight: "bold",
      fontSize: 15,
      color: "#8D6CB3",
    },
    swiper: {
      flex:1,
      backgroundColor: "black"
    },
    noSwipesText: {
      fontSize: 16,
      justifyContent: "center",
      textAlign: "center",
      marginVertical: '5%'
    },
    noSwipesHeadline: {
      fontFamily: 'Lobster',
      marginTop: 220,
      justifyContent: "center",
      textAlign: "center",
      marginVertical: '5%'
    }
  })
