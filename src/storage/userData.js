import { createSlice } from "@reduxjs/toolkit";
// Here is the user data.
export const userSlice = createSlice({
 name: "user",
 initialState: {},
 reducers: {
  fill: (state, action) => {
   state = action.payload;
  },
  add: (state, action) => {
   let temp = state;
   for (let x in action.payload) {
    temp[x] = action.payload[x];
   }
   state = temp;
  },
 },
});
export const { fill, add } = userSlice.actions;
export default userSlice.reducer;
