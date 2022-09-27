import { useEffect, useState } from "react"
import { useDrag } from "react-dnd"
import { useSelector } from "react-redux"
import { useGetSigleTeamQuery } from "../../features/team/teamApi"
import convertTime from "../../utils/convertTime"
import DropdownMenu from "../ui/DropdownMenu"


export default function ProjectCard({ project, myTeams }) {
   const { searchedText } = useSelector((state) => state.searched)
   const [menuOpen, setMenuOpen] = useState(false)
   const [textFound, setTextFound] = useState(false);
   const { email: loggedInEmail } = useSelector(state => state.auth.user)
   const { data: teamInfo } = useGetSigleTeamQuery({ id: project?.teamIds[0] }) || {}
   const { color: teamColor, title: teamName } = teamInfo || {}
   const { id, title, description, avatar, timestamp, status, creator } = project || {}

   useEffect(() => {
      const foundMatched = title.toLowerCase().replaceAll(/\s/g, '').match(searchedText.toLowerCase().replaceAll(/\s/g, ''))
      if (textFound) {
         setTextFound(false)
      }
      if (searchedText === '') {
         setTextFound(false)
      } else if (foundMatched?.length > 0) {
         setTextFound(true)
      }

   }, [searchedText, title, textFound])

   const [, drag] = useDrag(() => ({
      type: "projectCard",
      item: { id }
   }))

   const showMenu = () => { setMenuOpen(!menuOpen) }
   return (
      <div ref={drag}
         className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${textFound && "ring-2 ring-pink-500 ring-inset"}`}
      >
         {((status === 'Backlog' || menuOpen) && (loggedInEmail === creator)) && <>
            <button onClick={showMenu}
               className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
               id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
            >
               <svg
                  className="w-4 h-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
               >
                  <path
                     d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  />
               </svg>

            </button>
            {menuOpen && <DropdownMenu id={id} menuControl={showMenu} />}
         </>

         }
         <span
            className={`flex items-center h-6 px-3 text-xs font-semibold text-${teamColor}-500 bg-${teamColor}-100 rounded-full`}
         >{teamName}</span
         >
         <h4 className="mt-3 text-sm font-medium">
            {description}
         </h4>
         <div
            className="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
         >
            <div className="flex items-center">
               <svg
                  className="w-4 h-4 text-gray-300 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
               >
                  <path
                     fillRule="evenodd"
                     d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                     clipRule="evenodd"
                  />
               </svg>
               <span className="ml-1 leading-none"
               >{convertTime(timestamp)}</span
               >
            </div>

            <img
               className="w-6 h-6 ml-auto rounded-full"
               src={avatar} alt=''
            />
         </div>
      </div>
   )
}
