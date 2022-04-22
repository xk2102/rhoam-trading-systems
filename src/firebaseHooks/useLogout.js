import { useAuthContext } from "../firebaseHooks/useAuthContext";
// FIREBASE
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const useLogout = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const { dispatch } = useAuthContext();
  // ----------------------------------------------------------
  // FUNCTIONS-------------------------------------------------
  // ----------------------------------------------------------
  const logout = () => {
    signOut(auth)
      .then(() => dispatch({ type: "LOGOUT" }))
      .catch((err) => console.log(err.mes));
  };
  // ----------------------------------------------------------
  // RETURN ---------------------------------------------------
  // ----------------------------------------------------------
  return { logout };
};
