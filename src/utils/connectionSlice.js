import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, payload) => null,
  },
});

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
