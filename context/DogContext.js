import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../firebase";
import { useFirebaseAuth } from "./FirebaseAuthContext";

const DogContext = createContext(undefined);

const DogProvider = ({children}) => {
  const [dog, setDog] = useState(null);
  const value = { dog };

  useEffect(() => {
    //we want to update state every time we update our dog document
    //this should only be the auth user's dog
    // const unsubscribe = onSnapshot(doc(db, "users", dogID?), (doc) => {
    //   console.log("current dog: ", doc.data())
    // });
    const unsubscribe = useFirebaseAuth()
    return unsubscribe;
  }, []);

  return (
    <DogContext.Provider value={value}>
      {children}
    </DogContext.Provider>
  );
};

function useDog(){
  const context = useContext(DogContext);
  if (context === undefined) {
    throw new Error(
      "useDog must be used within a DogProvider"
    );
  }
  return context.dog;
}

export { DogProvider, useDog };
