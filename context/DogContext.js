import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDocs, onSnapshot, collection } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth, FirebaseAuthContext } from "./FirebaseAuthContext";

const DogContext = createContext(undefined);

const DogProvider = ({children}) => {
  const [dogUser, setDogUser] = useState(null);
  const value = dogUser;
  const currUser = useFirebaseAuth();
  const context = useContext(FirebaseAuthContext);

  useEffect(async () => {
    const dogsCollectionRef = collection(db, "users");
    const unsubscribe = onSnapshot(dogsCollectionRef, async () => {
      try {
        const userDocs = await getDocs(dogsCollectionRef);
        const allUsersData = userDocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const correctDog = allUsersData.find((dog) => dog.uid == currUser.uid);
        setDogUser(correctDog);
        return unsubscribe;
      } catch (error) {
        console.log("DOG CONTEXT ERRROR", error)
      }
    });
  }, []);

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
