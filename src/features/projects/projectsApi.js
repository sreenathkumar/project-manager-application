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
      })
   })
})

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi