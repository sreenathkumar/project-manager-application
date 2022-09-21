import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

   endpoints: (builder) => ({
      getTeams: builder.query({
         query: () => '/teams'
      }),
      createTeam: builder.mutation({
         query: (data) => ({
            url: '/teams',
            method: 'POST',
            body: data
         }),

         async onQueryStarted({ data }, { queryFulfilled, dispatch }) {
            const team = await queryFulfilled;
            console.log(team)
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
      })
   })
})

export const { useCreateTeamMutation, useGetTeamsQuery } = teamApi