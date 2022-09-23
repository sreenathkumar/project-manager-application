import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const teamApi = apiSlice.injectEndpoints({

   endpoints: (builder) => ({
      getTeams: builder.query({
         query: (userEmail) => `/teams?members_like${userEmail}_sort=timestamp&_order=desc`,

         //put socket listners here
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

                  updateCachedData((draft) => {

                     //const foundUser = data?.data?.members.find((membar) => member.email ===)
                     if (data?.data) {

                     }

                     //draft.data.push(data?.data)
                  });

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

export const { useCreateTeamMutation, useGetTeamsQuery, useEditTeamMutation, useGetSigleTeamQuery } = teamApi