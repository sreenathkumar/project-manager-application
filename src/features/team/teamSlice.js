import { createSlice } from "@reduxjs/toolkit";
const initialState = []

const teamSlice = createSlice({
   name: "teamIds",
   initialState,
   reducers: {
      addToTeams: (state, action) => {
         state.push(action.payload);
      }
   }
})

export default teamSlice.reducer
export const { addToTeams } = teamSlice.actions