import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs, onSnapshot, snapshot } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth } from "./FirebaseAuthContext";

const DogContext = createContext(undefined);

const DogProvider = ({ children }) => {
  const [dogUser, setDogUser] = useState(null);
  const value = dogUser;
  const currUser = useFirebaseAuth();

  useEffect(async () => {
    if(currUser && currUser.uid){
      onSnapshot(
        query(collection(db, "users"), (where("uid", "==", currUser.uid))),
        (snapshot) => {
          snapshot.forEach((doc) => {
            setDogUser({...doc.data(), id: doc.id});
          })
        }
      )
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
