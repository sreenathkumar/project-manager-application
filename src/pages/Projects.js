
import React from 'react'
import ProjectStage from '../components/projects/ProjectStage'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useGetProjectsQuery } from '../features/projects/projectsApi';
import { BarLoader } from 'react-spinners';
import Error from '../components/ui/Error';

export default function Projects() {
   const { data: projects, isLoading, isError } = useGetProjectsQuery() || {};
   const stages = ["Backlog", "Ready", "Doing", "Review", "Blocked"]

   let content = ''
   if (isLoading) {
      content = <div className='m-auto'>
         <BarLoader
            color="#6D28D9" />
      </div>
   }
   if (!isLoading && isError) {
      content = <Error message={"sme"} />
   }

   if (!isLoading && !isError) {
      content = <div
         className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
      >

         <div className="px-10 mt-6">
            <h1 className="text-2xl font-bold">Project Board</h1>
         </div>
         <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
            {stages.map((item, index) => <ProjectStage key={index} projects={projects} name={item} />)}
            <div className="flex-shrink-0 w-6"></div>
         </div>
      </div>
   }


   return (
      <DndProvider backend={HTML5Backend}>
         {content}
      </DndProvider>
   )
}
