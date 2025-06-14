import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../../helper/SessionHelper";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserDetails()|| null, 
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
