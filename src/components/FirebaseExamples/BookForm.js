// CSS----------------------------------------------------
// LIBRARIES ---------------------------------------------
// REACT -------------------------------------------------
import { useState } from "react";
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
// FIREBASE ----------------------------------------------
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
// FIREBASE HOOKS-----------------------------------------
import { useAuthContext } from "../../firebaseHooks/useAuthContext";

export const BookForm = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const [newBookTitle, setNewBookTitle] = useState("");
  const { user } = useAuthContext();
  // ----------------------------------------------------------
  // HANDLERS--------------------------------------------------
  // ----------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();
    const ref = collection(db, "books");
    await addDoc(ref, { title: newBookTitle, uid: user.uid });
    setNewBookTitle("");
  };
  // ----------------------------------------------------------
  // RETURN----------------------------------------------------
  // ----------------------------------------------------------
  return (
    <div>
      <h1>BookForm</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>bookTitle</span>
          <input required type="text" onChange={(event) => setNewBookTitle(event.target.value)} value={newBookTitle}></input>
        </label>
        <button>add</button>
      </form>
    </div>
  );
};
