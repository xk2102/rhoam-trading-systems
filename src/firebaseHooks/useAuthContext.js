import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }
  // ----------------------------------------------------------
  // RETURN ---------------------------------------------------
  // ----------------------------------------------------------
  return context;
};
