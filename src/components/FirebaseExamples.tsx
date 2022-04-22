import { useAuthContext } from "../firebaseHooks/useAuthContext";
import { Register } from "./FirebaseExamples/Register";
import { Login } from "./FirebaseExamples/Login";
import { Logout } from "./FirebaseExamples/Logout";
import { BookList } from "./FirebaseExamples/BookList";
import { BookForm } from "./FirebaseExamples/BookForm";

export default function FirebaseExamples() {
  const { user } = useAuthContext();
  return (
    <div>
      {!user && (
        <>
          <Register />
          <Login />
        </>
      )}
      {user && (
        <>
          <Logout />
          <BookList />
          <BookForm />
        </>
      )}
    </div>
  );
}
