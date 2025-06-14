import {createSlice} from "@reduxjs/toolkit";
export const settingSlice = createSlice({
  name: "settings",
  initialState: {
    loader: false,
  },
  reducers: {
    /*  showLoader:(state)=>{
state.loader ='';
        },

        hideLoader:(state)=>{
state.loader ='d-none';
        } */
    setLoading: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setLoading } = settingSlice.actions;
export default settingSlice.reducer