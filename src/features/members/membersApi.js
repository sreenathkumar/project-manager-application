import { apiSlice } from "../api/apiSlice"


export const membersApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getMember: builder.query({
         query: (email) => `/users?email=${email}`
      }),
      addMember: builder.mutation({
         query: ({ data, id }) => ({
            url: `/teams?id=${id}`,
            method: 'POST',
            body: data,
         })
      })
   })
})

export const { useGetMemberQuery } = membersApi