import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { membersApi, useGetMemberQuery } from "../../features/members/membersApi";
import { useEditTeamMutation } from "../../features/team/teamApi";

import debounceHandler from "../../utils/debounceHandler";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";


export default function AddMemberModal({ team, open, control }) {
   const [memberEmail, setMemberEmail] = useState('');
   const [memberExists, setMemberExists] = useState(false)
   const [memberCheck, setMemberCheck] = useState(false);
   const { user: loggedInUser } = useSelector((state) => state.auth) || {};
   const { email: myEmail } = loggedInUser || {};
   const [responseError, setResponseError] = useState('')

   const dispatch = useDispatch();
   const [editTeam, { isSuccess: editTeamSuccess }] = useEditTeamMutation();
   const { data: member } = useGetMemberQuery(memberEmail, {
      skip: !memberCheck,
   });

   useEffect(() => {
      if (member?.length > 0 && member[0].email !== myEmail) {
         // check conversation existance

         dispatch(
            membersApi.endpoints.getMemberTeams.initiate({
               id: team.id
            }, { forceRefetch: true })
         )
            .unwrap()
            .then((data) => {
               const foundMember = data[0]?.users.find((item) => item.email === member[0].email)
               if (foundMember) {
                  setMemberExists(true)
               }
            })
            .catch((err) => {
               setResponseError("There was a problem!");
            });
      }
   }, [team, dispatch, member, myEmail]);

   // listen conversation add/edit success
   useEffect(() => {
      if (editTeamSuccess) {
         control();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [editTeamSuccess]);

   const doSearch = (value) => {
      if (isValidEmail(value)) {
         // check user API
         setMemberCheck(true);
         setMemberEmail(value);
         setMemberExists(false)
      }
   };
   console.log("member: ", member);
   const handleSubmit = (e) => {
      e.preventDefault();

      const newArray = {
         "members": `${team?.members}-${member[0].email}`,
         "users": [...team.users, { email: member[0]?.email, name: member[0]?.name, id: member[0]?.id }]
      }
      editTeam({
         id: team?.id,
         data: newArray
      })
      setMemberEmail('')
      setMemberCheck(false)
   }

   const handleSearch = debounceHandler(doSearch, 500);
   return (
      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className={`${!open && "hidden"} bg-opacity-50 bg-slate-700 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-screen flex justify-center items-center`}>
         <div className="relative p-4 w-full max-w-md h-full md:h-auto">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

               <button onClick={control} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
               </button>

               <div className="py-6 px-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Team Member</h3>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                     <div>
                        <label htmlFor="member-email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Membar Email</label>
                        <input type="email" name="member-email" id="member-email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required onChange={(e) => handleSearch(e.target.value)} />
                     </div>


                     <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        disabled={memberExists && (member?.length > 0 && member[0].email === myEmail)}
                     >
                        Add Member
                     </button>
                     {member?.length === 0 && (
                        <Error message="This user does not exist!" />
                     )}
                     {member?.length > 0 &&
                        member[0].email === myEmail && (
                           <Error message="You are already in the team!" />
                        )}
                     {memberExists && (
                        <Error message="The user already in the team!" />
                     )}

                     {responseError && <Error message={responseError} />}
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
