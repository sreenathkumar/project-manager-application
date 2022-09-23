import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCreateProjectMutation } from "../../features/projects/projectsApi"
import { useGetSigleTeamQuery, useGetTeamsQuery } from "../../features/team/teamApi"


export default function AddProjectsModal({ control, open }) {
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState()
   const [teamId, setTeamId] = useState('')
   const [teamIdCheck, setTeamIdCheck] = useState(false)
   const [responseError, setResponseError] = useState('')

   const dispatch = useDispatch();
   const { user: loggedInUser } = useSelector((state) => state.auth) || {};
   const { email: myEmail } = loggedInUser || {};
   const { data: myTeams } = useGetTeamsQuery(myEmail)
   const [creatProject, { isLoading, isError, isSuccess }] = useCreateProjectMutation() || []

   const { data: team } = useGetSigleTeamQuery(teamId, {
      skip: !teamIdCheck,
   });

   // useEffect(() => {
   //    if (team?.length > 0) {
   //       // check team added or not e
   //       dispatch(
   //          membersApi.endpoints.getMemberTeams.initiate({
   //             id: team.id
   //          }, { forceRefetch: true })
   //       )
   //          .unwrap()
   //          .then((data) => {
   //             const foundMember = data[0]?.members.find((item) => item.email === member[0].email)
   //             if (foundMember) {
   //                setMemberExists(true)
   //             }
   //          })
   //          .catch((err) => {
   //             setResponseError("There was a problem!");
   //          });
   //    } else {
   //       console.log("The team doesn't exist")
   //    }
   // }, [team, dispatch, member, myEmail]);

   // // listen conversation add/edit success
   // useEffect(() => {
   //    if (editTeamSuccess) {
   //       control();
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [editTeamSuccess]);

   // // function to get Id from team ID
   // function getSecondPart(str) {

   //  return str.split('-')[1];
   // };
   // const doSearch = (value) => {
   //    if (isValidEmail(value)) {
   //       // check user API
   //       setTeamIdCheck(true);
   //       setTeamId(getSecondPart(value));
   //       setMemberExists(false)
   //    }
   // };

   // const handleSubmit = (e) => {
   //    e.preventDefault();

   //    const newArray = {

   //    }
   //    editTeam({
   //       id: team?.id,
   //       data: newArray
   //    })
   //    setMemberEmail('')
   //    setMemberCheck(false)
   // }

   // const handleSearch = debounceHandler(doSearch, 500);
   return (
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!open && "hidden"} bg-opacity-50 bg-slate-700 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}>
         <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

               <button onClick={control} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
               </button>

               <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Project</h3>
                  <form className="space-y-6" onSubmit={() => { }}>
                     <div>
                        <label htmlFor="team-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Poject Tiltle</label>
                        <input type="text" name="team-title" id="team-title" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Lorem Ipsum is simply dummy text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                     </div>
                     <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select id="countries" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                           <option defaultValue>Choose a team</option>
                           {myTeams?.map((team, index) => <option key={index} value={team.id}>
                              {team.title + " "}
                              ({team.title.replace(/\s+/g, '')}_{team.id})
                           </option>)}

                        </select>
                     </div>
                     <div>
                        <label htmlFor="team-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project Description</label>
                        <textarea type="textarea" name="team-description" id="team-description" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry." className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={description} onChange={(e) => setDescription(e.target.value)} />
                     </div>

                     <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Project</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}