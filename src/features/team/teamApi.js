import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";


export const teamApi = apiSlice.injectEndpoints({

   endpoints: (builder) => ({
      getTeams: builder.query({
         query: (userEmail) => `/teams?members_like=${userEmail}&_sort=timestamp&_order=desc`,

         //socket listners here
         async onCacheEntryAdded(
            arg,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
         ) {
            // create socket
            const socket = io(process.env.REACT_APP_API_URL, {
               reconnectionDelay: 1000,
               reconnection: true,
               reconnectionAttemps: 10,
               transports: ["websocket"],
               agent: false,
               upgrade: false,
               rejectUnauthorized: false,
            });

            try {
               await cacheDataLoaded;
               socket.on("teams", (data) => {
                  console.log(data);
                  if (data.data.members.includes(arg.userEmail)) {
                     updateCachedData((draft) => {
                        draft.forEach((element) => {
                           if (Number(data.data.id) === Number(element.id)) {
                              draft.members = data.data.members
                           }
                        });
                        draft.push(data.data)
                     });
                  }
               });
            } catch (error) {

            }
            await cacheEntryRemoved;
            socket.close();
         },

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