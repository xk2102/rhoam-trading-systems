// CSS----------------------------------------------------
// LIBRARIES ---------------------------------------------
// REACT -------------------------------------------------
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
// FIREBASE ----------------------------------------------
// FIREBASE HOOKS-----------------------------------------
import { useLogout } from "../../firebaseHooks/useLogout";

export const Logout = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const { logout } = useLogout();
  // ----------------------------------------------------------
  // RETURN----------------------------------------------------
  // ----------------------------------------------------------
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
};
