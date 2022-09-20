import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function PrivateRoute({ children }) {
   const userLoggedIn = useAuth();

   return userLoggedIn ? children : <Navigate to="/" />
}