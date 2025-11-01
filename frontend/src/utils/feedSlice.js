import { createSlice } from "@reduxjs/toolkit";

const feedSlice  = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addFeed : (state, action)=>{
            return action.payload;
        },
        removeUserFromFeed : (state, action)=>{
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        },
        moveToLast: (state, action) => {
            console.log("before moveToLast(), state= ", state);
            if (state && state.length > 0) {
                const firstUser = state.shift(); // Removes the first element and returns it.
                state.push(firstUser);           // Adds the removed element to the end of the state.
            }
            console.log("after moveToLast(), state= ", state);
        }
        
    }
})

export const {addFeed , removeUserFromFeed, moveToLast} = feedSlice.actions;
export default feedSlice.reducer;