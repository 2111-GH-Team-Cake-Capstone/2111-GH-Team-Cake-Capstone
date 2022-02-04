import React, { createContext, useContext } from "react";

export const FirebaseContext = createContext();

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext);
  if (firebaseContext === undefined) {
    throw new Error(
      "useFirebase must be used within a FirebaseContext.Provider"
    );
  }
  return firebaseContext;
};
