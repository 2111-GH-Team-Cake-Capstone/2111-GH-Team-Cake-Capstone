import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import Swiper, { onSwipedLeft, onSwipedRight } from 'react-native-deck-swiper';
import Icon from 'react-native-ico';
import TinderCard from './TinderCard';
import { collection, doc, getDocs, onSnapshot, snapshot, query, where, addDoc } from "firebase/firestore"; 
import db from '../firebase.js';
import { useFirebaseAuth } from "../context/FirebaseAuthContext";

const iconHeight = 75;
const iconWidth = 75;

//grabbing user collection from our database
const usersCollectionRef = collection(
  db,
  'users'
);

//grabbing swipes collection from our database
const swipesCollectionRef = collection(
  db,
  'swipes'
);

export default function BrowseUsers({navigation}) {
  const [users, setUsers] = useState([]);
  // const currUser = useFirebaseAuth(); 

  useEffect(async () => {
    //query through the users collection and find all users where city = current user's city
    const localUsersCollectionRef = query(usersCollectionRef, where("city_location", "==", "New York City"))
    onSnapshot(localUsersCollectionRef,(snapshot) => {
      let swipedUsers = [];
      const allUsersData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //query through the swipes collection and find all documents where our current user is dog a and they have already swiped on dog_b
      const existingSwipesCollectionRefDogA = query(swipesCollectionRef, where("dog_a", "==", "CJnHpheCmf9UyqYP4RtV"), where("dog_a_swiped", "==", true))
      //query through the swipes collection and find all documents where our current user is dog b and they have already swiped on dog_b
      const existingSwipesCollectionRefDogB = query(swipesCollectionRef, where("dog_b", "==", "CJnHpheCmf9UyqYP4RtV"), where("dog_b_swiped", "==", true))
      onSnapshot(existingSwipesCollectionRefDogA,(snapshot) => {
        const swipesDataA = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //if the current user is dog_a, then we want to push dog_b's ID to our swipedUsers array
        swipesDataA.forEach(doc => {
          swipedUsers.push(doc.dog_b)
        })
        onSnapshot(existingSwipesCollectionRefDogB,(snapshot) => {
          const swipesDataB = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          //if the current user is dog_b, then we want to push dog_a's ID to our swipedUsers array
          swipesDataB.forEach(doc => {
            swipedUsers.push(doc.dog_a)
          })
        });
        //filter thru all of our users and only return the user's who are not in the swipedUsers array (because we already saw those users)
        //and filter to make sure we are not also displying our current user
        const unseenUsers = allUsersData.filter(user => {
          if(swipedUsers.includes(user.id) || user.id === "CJnHpheCmf9UyqYP4RtV") {
            return false;
          }
          return true;
        })
        //set state of users to the users we have not seen
        setUsers(unseenUsers);
      });
    });
  }, []);

  //functions to handle swipes - 

  //NEED TO ADD IN CHECK TO SEE IF SWIPE DOCUMENT BETWEEN THESE TWO USERS EXISTS
  const swipeLeft = (cardIndex) => {
    //swiped user is the current user dispayed on the card
    const swipedUser = users[cardIndex];
    //adding a new swiped document where our current dog is dog_a and swipedUser is dog_b
    addDoc(swipesCollectionRef, {
      dog_a: "CJnHpheCmf9UyqYP4RtV",
      dog_b: swipedUser.id,
      dog_a_swiped: true,
      dog_a_liked: false
    });
  }

  const swipeRight = (cardIndex) => {
    const swipedUser = users[cardIndex]
  }

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
         cardIndex={0}
         onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
         onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
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
