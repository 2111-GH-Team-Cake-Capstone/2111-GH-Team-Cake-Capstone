import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDocs, onSnapshot, collection } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth, FirebaseAuthContext } from "./FirebaseAuthContext";
const DogContext = createContext(undefined);

const DogProvider = ({ children, ...otherProps }) => {
  const [dogUser, setDogUser] = useState(null);
  const value = dogUser;
  const currUser = useFirebaseAuth();
  console.log(FirebaseAuthContext);
  const context = useContext(FirebaseAuthContext);

  useEffect(async () => {
    console.log("idiot check", currUser, context);
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
      } catch (e) {
        console.log("ext", currUser, context);
        console.log("gary was here", e);
      }
    });
  }, []);

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
};

function useDog() {
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error("useDog must be used within a DogProvider");
  }
  return context;
}

export { DogProvider, useDog };
