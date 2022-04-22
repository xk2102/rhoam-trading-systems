import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
// FIREBASE
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogin = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  // ----------------------------------------------------------
  // FUNCTIONS-------------------------------------------------
  // ----------------------------------------------------------
  const login = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => dispatch({ type: "LOGIN", payload: res.user }))
      .catch((err) => setError(err.message));
  };
  // ----------------------------------------------------------
  // RETURN ---------------------------------------------------
  // ----------------------------------------------------------
  return { error, login };
};
