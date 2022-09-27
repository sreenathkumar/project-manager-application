import { apiSlice } from "../api/apiSlice";


export const teamApi = apiSlice.injectEndpoints({

   endpoints: (builder) => ({
      getTeams: builder.query({
         query: (userEmail) => `/teams?members_like=${userEmail}&_sort=timestamp&_order=desc`,

      }),
      getSigleTeam: builder.query({
         query: ({ id }) => `/teams/${id}`
      }),
      createTeam: builder.mutation({
         query: (data) => ({
            url: '/teams',
            method: 'POST',
            body: data
         }),

         async onQueryStarted(data, { queryFulfilled, dispatch }) {
            const team = await queryFulfilled;
            if (team) {
               dispatch(apiSlice.util.updateQueryData("getTeams", data.members, (draft) => {
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

      }),
      deleteTeam: builder.mutation({
         query: ({ id, email }) => ({
            url: `/teams/${id}`,
            method: 'DELETE',
         }),
         async onQueryStarted({ id, email }, { queryFulfilled, dispatch }) {
            // optimistic update of projects cache
            const deleteResult = dispatch(apiSlice.util.updateQueryData(
               "getTeams",
               email,
               (draft) => {
                  draft.forEach((team, index) => {
                     //eslint-disable-next-line
                     if (team.id == id) {
                        draft.splice(index, 1);
                     }
                  })
               }
            ))

            try {
               await queryFulfilled;
            } catch (error) {
               deleteResult.undo()
            }
         }
      })
   })
})

export const { useCreateTeamMutation, useGetTeamsQuery, useEditTeamMutation, useGetSigleTeamQuery, useDeleteTeamMutation } = teamApi