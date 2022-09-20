import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   accessToken: '',
   user: {}
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      userLoggedIn: (state, action) => {
         state.accessToken = action.payload.accessToken
         state.user = action.payload.user
      },
      userLoggedOut: (state, action) => {
         state.accessToken = ''
         state.user = {}
      }
   }
})

export const { userLoggedIn, userLoggedOut } = authSlice.actions
export default authSlice.reducer;