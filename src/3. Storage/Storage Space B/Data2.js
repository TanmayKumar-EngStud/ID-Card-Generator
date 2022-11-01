// just Copy pasted from Data1.js
import { createSlice } from "@reduxjs/toolkit";
// Here is the user data.
export const dataSlice = createSlice({
 name: "data",
 initialState: {
  release: false,
 },
 reducers: {
  // All the general operations. ( somewhat CRUD operations)
  replace2: (state, action) => {
   state = action.payload;
  },
  add2: (state, action) => {
   // this will also re-write!!
   let temp = state;
   for (let x in action.payload) {
    temp[x] = action.payload[x];
   }
   state = temp;
  },
  remove2: (state) => {
   state = {};
  },
  removeOnly2: (state, action) => {
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
export const { replace2, add2, remove2, removeOnly2 } = dataSlice.actions;
export default dataSlice.reducer;
