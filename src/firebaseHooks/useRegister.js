import { useState } from "react";
import { useAuthContext } from "../firebaseHooks/useAuthContext";
// FIREBASE
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useRegister = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  // ----------------------------------------------------------
  // FUNCTIONS ------------------------------------------------
  // ----------------------------------------------------------
  const register = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => dispatch({ type: "LOGIN", payload: res.user }))
      .catch((err) => setError(err.message));
  };
  // ----------------------------------------------------------
  // RETURN ---------------------------------------------------
  // ----------------------------------------------------------
  return { error, register };
};
