import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/ui/Navbar';
import useAuthCheck from './hooks/useAuthCheck';
import Login from './pages/Login';
import Projects from './pages/Projects';
import Teams from './pages/Teams';

function App() {
  const authChecked = useAuthCheck()
  return (!authChecked ?
    <div>Checking Authentication ......</div>
    :

    <div
      className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
    ><BrowserRouter>
        <Navbar />

        <Routes>

          <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/teams' element={<PrivateRoute><Teams /></PrivateRoute>} />
          <Route path='/projects' element={<PrivateRoute><Projects /></PrivateRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
