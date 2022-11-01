import { createSlice } from "@reduxjs/toolkit";
// Here is the user data.
export const dataSlice = createSlice({
 name: "data",
 initialState: {},
 reducers: {
  // All the general operations. ( somewhat CRUD operations)
  replace1: (state, action) => {
   state = action.payload;
  },
  add1: (state, action) => {
   // this will also re-write!!
   let temp = state;
   for (let x in action.payload) {
    temp[x] = action.payload[x];
   }
   state = temp;
  },
  remove1: (state) => {
   state = {};
  },
  removeOnly1: (state, action) => {
   let temp = {};
   for (let x in state) {
    if (action.payload[x] === undefined) {
     temp[x] = state[x];
    }
   }
   state = temp;
  },
 },
});
export const { replace1, add1, remove1, removeOnly1 } = dataSlice.actions;
export default dataSlice.reducer;
