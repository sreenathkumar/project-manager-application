import { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteTeamMutation } from "../../features/team/teamApi";
import convertTime from "../../utils/convertTime";
import AddMemberModal from "./AddMemberModal";


export default function TeamCard({ team }) {
   const { title, description, color, timestamp, id } = team || {};
   const { email } = useSelector((state) => state.auth.user)
   const [deleteTeam] = useDeleteTeamMutation() || [];
   const time = convertTime(timestamp);
   const [modalOpen, setModalOpen] = useState(false);
   const modalControl = () => {
      setModalOpen(!modalOpen);
   }
   console.log(id);
   const handleDeleteTeam = () => {
      deleteTeam({ id, email })
   }

   return (
      <>
         <AddMemberModal open={modalOpen} team={team} control={modalControl} />
         <div
            className="relative flex flex-col justify-between items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            draggable="true"
         >
            <button onClick={() => setModalOpen(!modalOpen)}
               className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
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
            <button onClick={handleDeleteTeam}
               className="absolute top-0 right-3 mr-4 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M13.5 6.5V7h5v-.5a2.5 2.5 0 0 0-5 0Zm-2 .5v-.5a4.5 4.5 0 1 1 9 0V7H28a1 1 0 1 1 0 2h-1.508L24.6 25.568A5 5 0 0 1 19.63 30h-7.26a5 5 0 0 1-4.97-4.432L5.508 9H4a1 1 0 0 1 0-2h7.5Zm2.5 6.5a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0v-10Zm5-1a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0v-10a1 1 0 0 0-1-1Z" /></svg>
            </button>

            <span
               className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
            >{title}</span
            >
            <h4 className="mt-3 text-sm font-medium">
               {description}
            </h4>
            <div
               className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400"
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
                  <span className="ml-1 leading-none">{time}</span>
               </div>
               <div className="flex items-center">
                  <span className="ml-1 leading-none">ID: {title.replace(/\s+/g, '')}_{id}</span>
               </div>
            </div>
         </div>
      </>

   )
}
