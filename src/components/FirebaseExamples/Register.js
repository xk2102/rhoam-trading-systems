// CSS----------------------------------------------------
// LIBRARIES ---------------------------------------------
// REACT -------------------------------------------------
import { useState } from "react";
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
// FIREBASE ----------------------------------------------
// FIREBASE HOOKS-----------------------------------------
// HOOKS
import { useRegister } from "../../firebaseHooks/useRegister";

export const Register = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, register } = useRegister();
  // ----------------------------------------------------------
  // HANDLERS--------------------------------------------------
  // ----------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    register(email, password);
  };
  // ----------------------------------------------------------
  // RETURN----------------------------------------------------
  // ----------------------------------------------------------
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email</span>
          <input required type="email" onChange={(event) => setEmail(event.target.value)} value={email}></input>
        </label>
        <label>
          <span>password</span>
          <input required type="password" onChange={(event) => setPassword(event.target.value)} value={password}></input>
        </label>
        <button>register</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
