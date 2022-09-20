import React from 'react'
import ProjectStage from '../components/projects/ProjectStage'



export default function Projects() {
   return (
      <>
         <div
            className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
         >

            <div className="px-10 mt-6">
               <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">

               <ProjectStage />
               <div className="flex-shrink-0 w-6"></div>
            </div>
         </div>

      </>
   )
}
