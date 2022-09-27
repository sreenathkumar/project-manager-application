
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useMatch } from 'react-router-dom';
import logoImage from '../../assets/images/logo.svg';
import { userLoggedOut } from '../../features/auth/authSlice';
import { searchProject } from '../../features/projects/projectsSlice';
import useAuth from '../../hooks/useAuth';
import debounceHandler from '../../utils/debounceHandler';


export default function Navbar() {
   const dispatch = useDispatch()
   const userLoggedIn = useAuth();
   const { name, avatar, email } = useSelector(state => state.auth.user)
   const [dropdownOpen, setDropdownOpen] = useState(false)
   const inProjectRoute = useMatch("/projects");
   const inTeamRoute = useMatch("/teams");

   const handleLogOut = () => {
      dispatch(userLoggedOut())
   }
   const doSearch = (value) => {
      dispatch(searchProject(value))
   }
   const handleDropdown = () => {
      setDropdownOpen(!dropdownOpen)
   }


   const handleSearch = debounceHandler(doSearch, 500)
   return (
      <nav
         className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
      >
         <Link to="/projects"><img src={logoImage} className="h-10 w-10" alt='my logo' /></Link>
         {inProjectRoute && <input onChange={(e) => handleSearch(e.target.value)}
            className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
            type="search"
            placeholder="Search for anything…"
         />}
         <div className="ml-10">
            <Link to="/projects"
               className={`mx-2 text-sm font-semibold ${inProjectRoute ? "text-indigo-700" : "text-gray-600 hover:text-indigo-700"}`}

            >Projects</Link
            >
            <Link to="/teams"
               className={`mx-2 text-sm font-semibold ${inTeamRoute ? "text-indigo-700" : "text-gray-600 hover:text-indigo-700"}`}

            >Team</Link
            >
         </div>
         {userLoggedIn && <div className='ml-auto relative'>
            <button onClick={handleDropdown}
               className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
            >
               <img
                  src={avatar}
                  alt=""
               />
            </button>
            <div className={`absolute ${!dropdownOpen && "hidden"} right-0 z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown`}>
               <div className="py-3 px-4">
                  <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{email}</span>
               </div>
               <ul className="py-1" aria-labelledby="user-menu-button">
                  <li>
                     <button onClick={handleLogOut} className=" w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                  </li>
               </ul>
            </div>
         </div>}
         {userLoggedIn && <>
            <button className="hidden bg-transparent hover:bg-violet-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-700 hover:border-transparent rounded ml-4" >
               Log Out
            </button>

         </>
         }

      </nav>
   )
}
