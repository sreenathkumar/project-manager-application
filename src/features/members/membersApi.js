import { apiSlice } from "../api/apiSlice"


export const membersApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getMember: builder.query({
         query: (email) => `/users?email=${email}`
      }),
      getMemberTeams: builder.query({
         query: ({ id }) => `/teams?id=${id}`
      }),
      addMember: builder.mutation({
         query: ({ data, id }) => ({
            url: `/teams?id=${id}`,
            method: 'PATCH',
            body: data,
         })
      }),

   })
})

export const { useGetMemberQuery, useGetMemberTeamsQuery, useAddMemberMutation, useDeleteMemberMutation } = membersApi