import * as React from "react";
import { onAuthStateChanged }from "firebase/auth";
import { auth } from '../firebase'

const FirebaseAuthContext =
  React.createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider };
