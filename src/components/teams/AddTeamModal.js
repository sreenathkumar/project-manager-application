import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateTeamMutation } from '../../features/team/teamApi';

export default function AddTeamModal({ open, control }) {
   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const [color, setColor] = useState('')
   const { user } = useSelector((state) => state.auth);

   const [createTeam] = useCreateTeamMutation();

   const handleSubmit = (e) => {
      e.preventDefault()

      createTeam({
         title,
         description,
         members: user.email,
         users: [user],
         color,
         admin: user,
         timestamp: new Date().getTime(),
      });
      setTitle('');
      setDescription('')
      control()
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
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Your Team</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="team-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Team Tiltle</label>
                        <input type="text" name="team-title" id="team-title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        <label htmlFor="team-description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Team Description</label>
                        <textarea type="textarea" name="team-description" id="team-description" placeholder=" Team Description ••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required value={description} onChange={(e) => setDescription(e.target.value)} />
                     </div>

                     <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Team</button>

                  </form>
               </div>
            </div>
         </div>
      </div>

   )
}
