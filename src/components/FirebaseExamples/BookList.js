// CSS----------------------------------------------------
// LIBRARIES ---------------------------------------------
// REACT -------------------------------------------------
// CONTEXT -----------------------------------------------
// COMPONENTS --------------------------------------------
// FIREBASE ----------------------------------------------
import { db } from "../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuthContext } from "../../firebaseHooks/useAuthContext";
// FIREBASE HOOKS-----------------------------------------
import { useCollection } from "../../firebaseHooks/useCollection";

export const BookList = () => {
  // ----------------------------------------------------------
  // STATE ----------------------------------------------------
  // ----------------------------------------------------------
  const { user } = useAuthContext();
  const { documents: books } = useCollection("books", ["uid", "==", user.uid]);
  // ----------------------------------------------------------
  // FUNCTIONS-------------------------------------------------
  // ----------------------------------------------------------
  const deleteBook = async (bookId) => {
    const ref = doc(db, "books", bookId);
    await deleteDoc(ref);
  };
  // ----------------------------------------------------------
  // RETURN ---------------------------------------------------
  // ----------------------------------------------------------
  return (
    <div>
      <h1>BookList</h1>
      {books &&
        books.map((book, index) => (
          <div key={index} onClick={() => deleteBook(book.id)}>
            {book.id}
            {book.title}
            {book.author}
          </div>
        ))}
    </div>
  );
};
