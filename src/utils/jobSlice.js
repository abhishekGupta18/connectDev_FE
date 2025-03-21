import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: null,
  reducers: {
    showJobs: (state, action) => action.payload,
    removeJobs: (state, action) => null,
  },
});

export const { showJobs, removeJobs } = jobSlice.actions;
export default jobSlice.reducer;
