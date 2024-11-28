import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  currentUser:""

};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken= payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser= payload;
    },
  },
});

const { actions, reducer } = loginSlice;

export const {
  signIn,
  setAccessToken,
  setCurrentUser,
} = actions;
export default reducer;
