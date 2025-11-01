import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addToRequests: (state, action) => action.payload,
    removeFromRequests: (state, action) => {
      console.log("removeFromRequest is called");
      console.log("before removeFromRequests, requests = ", state);
      const newRequests = state.filter(user => 
          user._id.toString() !== action.payload.toString()
      );
      console.log("newRequests = ", newRequests);
      return newRequests;
  }
  
  },
});

export const { addToRequests, removeFromRequests } = requestSlice.actions;
export default requestSlice.reducer;