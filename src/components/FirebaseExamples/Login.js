// CSS----------------------------------------------------
// LIBRARIES ---------------------------------------------
// REACT -------------------------------------------------
import { useState } from "react";
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
// FIREBASE ----------------------------------------------
// FIREBASE HOOKS-----------------------------------------
// HOOKS
import { useLogin } from "../../firebaseHooks/useLogin";

export const Login = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();
  // ----------------------------------------------------------
  // HANDLERS--------------------------------------------------
  // ----------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };
  // ----------------------------------------------------------
  // RETURN----------------------------------------------------
  // ----------------------------------------------------------
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>email</span>
          <input required type="email" onChange={(event) => setEmail(event.target.value)} value={email}></input>
        </label>
        <label>
          <span>password</span>
          <input required type="password" onChange={(event) => setPassword(event.target.value)} value={password}></input>
        </label>
        <button>login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};
