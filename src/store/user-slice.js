import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  image: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
    resetUser(state) {
      state.username = initialState.username;
      state.image = initialState.image;
    },
    updateImage(state, action) {
      state.image = action.payload;
    },
  },
});
export const userAction = userSlice.actions;
export default userSlice.reducer;