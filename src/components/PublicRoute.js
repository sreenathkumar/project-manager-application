import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function PublicRoute({ children }) {
   const userLoggedIn = useAuth();

   return !userLoggedIn ? children : <Navigate to="/projects" />
}
