import { configureStore } from "@reduxjs/toolkit";

import  settingSlice  from "../state-slice/settingSlice";
import  taskSlice  from "../state-slice/taskSlice";
import  summarySlice  from "../state-slice/summarySlice";
import  authSlice  from "../state-slice/authSlice"

export default configureStore({
  reducer: {
    settings: settingSlice,
    task: taskSlice,
    summary: summarySlice,
    auth: authSlice,
  },
});