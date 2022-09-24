import { json } from "react-router-dom";
import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProjects: builder.query({
         query: () => `/projects`
      }),
      createProject: builder.mutation({
         query: (data) => ({
            url: '/projects',
            method: 'POST',
            body: data
         }),
      }),
      editProject: builder.mutation({
         query: ({ id, data }) => ({
            url: `/projects/${id}`,
            method: 'PATCH',
            body: data,
         }),

         async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            // optimistic updat of projects cache
            const statusUpdateResult = dispatch(apiSlice.util.updateQueryData(
               "getProjects",
               undefined,
               (draft) => {
                  draft.forEach(project => {
                     if (project.id == id) {
                        project.status = data.status;
                     }
                  })
               }
            ))

            try {
               await queryFulfilled;
            } catch (error) {
               statusUpdateResult.undo()
            }
         }
      })
   })
})

export const { useGetProjectsQuery, useCreateProjectMutation, useEditProjectMutation } = projectApi