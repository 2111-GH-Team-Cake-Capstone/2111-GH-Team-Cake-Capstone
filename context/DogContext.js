import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth, FirebaseAuthContext } from "./FirebaseAuthContext";

const DogContext = createContext(undefined);

const DogProvider = ({ children }) => {
  const [dogUser, setDogUser] = useState(null);
  const value = dogUser;
  const currUser = useFirebaseAuth();

  //const context = useContext(FirebaseAuthContext);

  useEffect(() => {
    // console.log("CURR USER", currUser)
    if(currUser && currUser.uid){
      const dog = query(collection(db, "users"), where("uid", "==", currUser.uid));
    // // const unsubscribe = onSnapshot(dog, (snapshot) => {snapshot.docChanges().forEach((change) => change.doc.data);
    console.log("dog", dog);
    // return dog;
    //call setDogUser(dog)
    }
  }, [currUser]);

  return (
    <DogContext.Provider value={value}>
      {children}
    </DogContext.Provider>
  );
}

function useDog() {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error(
      "useDog must be used within a DogProvider"
    );
  }
  return context;
}

export { DogProvider, useDog };
