import { useDeleteProjectMutation } from "../../features/projects/projectsApi"

export default function DropdownMenu({ id, menuControl }) {
   const [deleteProject] = useDeleteProjectMutation()
   const handleDelete = () => {
      deleteProject({ id })
      menuControl()
   }
   return (
      <div id="dropdownDivider" className=" absolute mt-8 mr-4 top-4 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
         <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
            <li>
               <span className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</span>
            </li>
            <li>
               <span onClick={handleDelete} className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</span>
            </li>
         </ul>
      </div>
   )
}
