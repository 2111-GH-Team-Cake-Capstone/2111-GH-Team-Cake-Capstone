import * as React from "react";
import { onAuthStateChanged }from "firebase/auth";
import { auth } from '../firebase'

const FirebaseAuthContext =
  React.createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };
