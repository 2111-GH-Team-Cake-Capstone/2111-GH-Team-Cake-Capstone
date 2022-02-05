import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDocs, onSnapshot, collection } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth } from "./FirebaseAuthContext";

const DogContext = createContext(undefined);

const DogProvider = ({children}) => {
  const [dogUser, setDogUser] = useState(null);
  const value = dogUser;
  const currUser = useFirebaseAuth();

  useEffect(async () => {
    const usersCollectionRef = collection(
      db,
      'users'
    );
    const unsubscribe = onSnapshot(usersCollectionRef, async () => {
      const userDocs = await getDocs(usersCollectionRef);
      const allUsersData = userDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const correctDog = allUsersData.find((dog) =>
        dog.uid == currUser.uid
      );
      setDogUser(correctDog);
      return unsubscribe;
    })
  }, []);

  return (
    <DogContext.Provider value={value}>
      {children}
    </DogContext.Provider>
  );
}

function useDog(){
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error(
      "useDog must be used within a DogProvider"
    );
  }
  return context;
}

export { DogProvider, useDog };
