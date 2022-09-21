import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

   endpoints: (builder) => ({
      getTeams: builder.query({
         query: () => '/teams'
      }),
      getSigleTeam: builder.query({
         query: (id) => `/teams/${id}`
      }),
      createTeam: builder.mutation({
         query: (data) => ({
            url: '/teams',
            method: 'POST',
            body: data
         }),

         async onQueryStarted({ data }, { queryFulfilled, dispatch }) {
            const team = await queryFulfilled;
            if (team) {
               dispatch(apiSlice.util.updateQueryData("getTeams", data, (draft) => {
                  team.data.id.toString()
                  draft.unshift({
                     ...team.data,
                     id: team.data.id.toString()
                  })
               }))
            }
         },
      }),
      editTeam: builder.mutation({
         query: ({ id, data }) => ({
            url: `/teams/${id}`,
            method: 'PATCH',
            body: data
         }),

      })
   })
})

export const { useCreateTeamMutation, useGetTeamsQuery, useEditTeamMutation } = teamApi