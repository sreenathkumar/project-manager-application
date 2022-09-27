import { useState } from "react"
import { useSelector } from "react-redux"
import { useCreateProjectMutation } from "../../features/projects/projectsApi"
import { useGetTeamsQuery } from "../../features/team/teamApi"
import Error from "../ui/Error"


export default function AddProjectsModal({ control, open }) {
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   const [color, setColor] = useState('')
   const [teamId, setTeamId] = useState("")
   const [resError, setResError] = useState('')
   const { user: loggedInUser } = useSelector((state) => state.auth) || {};
   const { email: myEmail, avatar } = loggedInUser || {};
   const { data: myTeams } = useGetTeamsQuery(myEmail)
   const [creatProject, { isLoading, isError, }] = useCreateProjectMutation() || []

   const handleSubmit = (e) => {
      e.preventDefault()
      if (teamId !== ' ' || teamId !== "Choose a team") {
         const data = {
            title,
            description,
            color,
            status: "Backlog",
            teamIds: [teamId],
            creator: `${myEmail}`,
            timestamp: new Date().getTime(),
            avatar
         }
         creatProject(data)
         setTitle('');
         setDescription('');
         setTeamId("")
         control()
      } else {
         setResError("Choose a valid team")
      }

   }

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
                  <form className="space-y-6" onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="team-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Poject Tiltle</label>
                        <input type="text" name="team-title" id="team-title" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Lorem Ipsum is simply dummy text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                     </div>
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select a color</label>

                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                           <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input id="horizontal-list-radio-slate" type="radio" value="slate" onChange={(e) => setColor(e.target.value)} name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-slate" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-slate-800' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                           <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input onChange={(e) => setColor(e.target.value)} id="horizontal-list-radio-pink" type="radio" value="pink" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-pink" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-pink-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                           <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input onChange={(e) => setColor(e.target.value)} id=" hidden horizontal-list-radio-purple" type="radio" value="purple" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-purple" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-purple-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                           <li className="w-full dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input onChange={(e) => setColor(e.target.value)} id="horizontal-list-radio-rose" type="radio" value="rose" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-rose" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-rose-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                           <li className="w-full dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input onChange={(e) => setColor(e.target.value)} id="horizontal-list-radio-blue" type="radio" value="blue" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-blue" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-blue-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                           <li className="w-full dark:border-gray-600">
                              <div className="flex items-center pl-3">
                                 <input onChange={(e) => setColor(e.target.value)} id="horizontal-list-radio-green" type="radio" value="green" name="list-radio" className="w-4 h-4 text-blue- 600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                 <label htmlFor="horizontal-list-radio-green" className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" className='fill-green-500' width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" /></svg></label>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>
                        <select id="countries" className="outline-none bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setTeamId(e.target.value)}>
                           <option value=''>Choose a team</option>
                           {myTeams?.map((team, index) => <option key={index} value={team.id}>
                              {team.title + " "}
                              ({team.title.replace(/\s+/g, '')}_{team.id})
                           </option>)}

                        </select>
                     </div>
                     <div>
                        <label htmlFor="team-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Project Description</label>
                        <textarea type="textarea" name="team-description" id="team-description" placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry." className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={description} onChange={(e) => setDescription(e.target.value)} />
                     </div>

                     <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={(isLoading || isError) || resError}>Create Project</button>
                     {isError && <Error message={'Something went wrong'} />}
                     {resError && <Error message={resError} />}
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
