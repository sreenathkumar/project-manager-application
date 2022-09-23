import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProjects: builder.query({
         query: (stage) => `/projects?status=${stage}`
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