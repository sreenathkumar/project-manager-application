import { useState } from "react"
import AddTeamModal from "../components/teams/AddTeamModal";
import TeamCard from "../components/teams/TeamCard";
import { useGetTeamsQuery } from "../features/team/teamApi";
import Loader from '../components/ui/Loader'
import { useSelector } from "react-redux";

export default function Teams() {
   const { email } = useSelector((state) => state.auth.user)
   const { data: teams, isLoading, isError } = useGetTeamsQuery() || {};

   const filteredTeams = teams?.filter((team) => {

      const founded = team.members.filter((member) => member.email === email);
      if (founded?.length > 0) {
         return true;
      } else {
         return false
      }
   }

   );


   const [modalOpen, setModalOpen] = useState(false);
   const modalControl = () => {
      setModalOpen(!modalOpen);
   }
   //what to render
   let content = ''

   if (isLoading) {
      content = <Loader />
   }
   if (!isLoading && isError) {
      content = <div>Something goes wrong...</div>
   }
   if (!isLoading && !isError) {
      content = <>
         {modalOpen && <AddTeamModal open={modalOpen} control={modalControl} />}
         <div className="px-10 mt-6 flex justify-between">
            <h1 className="text-2xl font-bold">Teams</h1>
            <button onClick={modalControl}
               className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
            >
               <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
               </svg>
            </button>
         </div>
         <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"
         >
            {filteredTeams?.map((team) => <TeamCard key={team.id} team={team} />)}
         </div>
      </>
   }


   return (content)
}
