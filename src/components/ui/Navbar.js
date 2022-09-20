
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoggedOut } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';
import logoImage from '../../assets/images/logo.svg'


export default function Navbar() {
   const dispatch = useDispatch()
   const userLoggedIn = useAuth();

   const handleLogOut = () => {
      dispatch(userLoggedOut())
   }
   return (
      <nav
         className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
      >
         <Link to="/projects"><img src={logoImage} className="h-10 w-10" alt='my logo' /></Link>
         <input
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
            type="search"
            placeholder="Search for anything…"
         />
         <div className="ml-10">
            <Link to="/projects"
               className="mx-2 text-sm font-semibold text-indigo-700"

            >Projects</Link
            >
            <Link to="/teams"
               className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"

            >Team</Link
            >
         </div>
         {userLoggedIn && <button
            className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
         >
            <img
               src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
               alt=""
            />
         </button>}
         {userLoggedIn &&
            <button className="bg-transparent hover:bg-violet-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded ml-4" onClick={handleLogOut}>
               Log Out
            </button>}

      </nav>
   )
}
