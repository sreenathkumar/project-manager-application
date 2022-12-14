import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProjects: builder.query({
         query: () => `/projects?_sort=timestamp&_order=desc`,
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
               // socket.on("teams", (data) => {
               //    updateCachedData((draft) => {

               //       //const foundUser = data?.data?.members.find((membar) => member.email ===)
               //       if (data?.data) {

               //       }

               //       //draft.data.push(data?.data)
               //    });

               // });
            } catch (error) {

            }
            await cacheEntryRemoved;
            socket.close();
         },
      }),
      createProject: builder.mutation({
         query: (data) => ({
            url: '/projects',
            method: 'POST',
            body: data
         }),
         async onQueryStarted(args, { queryFulfilled, dispatch }) {
            try {
               const resData = await queryFulfilled;
               // pasimistic update of projects cache
               dispatch(apiSlice.util.updateQueryData(
                  "getProjects",
                  undefined,
                  (draft) => {
                     draft.unshift(resData.data)
                  }
               ))

            } catch (error) {

            }
         }
      }),
      editProject: builder.mutation({
         query: ({ id, data }) => ({
            url: `/projects/${id}`,
            method: 'PATCH',
            body: data,
         }),

         async onQueryStarted({ id, data }, { queryFulfilled, dispatch }) {
            // optimistic update of projects cache
            const statusUpdateResult = dispatch(apiSlice.util.updateQueryData(
               "getProjects",
               undefined,
               (draft) => {
                  draft.forEach(project => {
                     //eslint-disable-next-line
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
      }),
      deleteProject: builder.mutation({
         query: ({ id }) => ({
            url: `/projects/${id}`,
            method: 'DELETE',
         }),
         async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
            // optimistic update of projects cache
            const deleteResult = dispatch(apiSlice.util.updateQueryData(
               "getProjects",
               undefined,
               (draft) => {
                  draft.forEach((project, index) => {
                     //eslint-disable-next-line
                     if (project.id == id) {
                        draft.splice(index, 1);
                     }
                     // const newArr = draft.filter(project => project.id != id);
                     // Object.assign(draft, newArr)

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

export const { useGetProjectsQuery, useCreateProjectMutation, useEditProjectMutation, useDeleteProjectMutation } = projectApi