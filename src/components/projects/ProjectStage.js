import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import { useEditProjectMutation } from '../../features/projects/projectsApi';
import AddProjectsModal from './AddProjectsModal';
import ProjectCard from './ProjectCard'

export default function ProjectStage({ name, projects }) {
   const [modalOpen, setModalOpen] = useState(false);

   const [editProject] = useEditProjectMutation() || {};
   const filteredProjects = projects?.filter(project => project.status === name);
   const [{ isOver }, drop] = useDrop(() => ({
      accept: 'projectCard',
      drop: (item) => actionOnDrop(item.id),
      collect: (monitor) => ({
         isOver: !!monitor.isOver()
      })
   }))

   const actionOnDrop = (id) => {

      ///Doing what happen after dropping the item
      const updatedProject = { status: name }
      editProject({ id, data: updatedProject })
   }

   const modalControl = () => {
      setModalOpen(!modalOpen);
   }
   return (
      <> {modalOpen && <AddProjectsModal control={modalControl} open={modalOpen} />}
         <div className={`flex flex-col flex-shrink-0 w-72 rounded ${isOver ? "border-black" : "border-transparent"} border bg-white bg-opacity-30`} ref={drop}>
            <div className="flex items-center flex-shrink-0 h-10 px-2">
               <span className="block text-sm font-semibold">{name}</span>
               <span
                  className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
               >{filteredProjects?.length}</span
               >
               {name === "Backlog" && <button onClick={() => setModalOpen(!modalOpen)}
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
               </button>}
            </div>
            <div className="flex flex-col pb-2 overflow-auto .scrollbar scrollbar-style">
               {filteredProjects?.map((item, index) => <ProjectCard key={index} project={item} />)}
            </div>
         </div>
      </>

   )
}
