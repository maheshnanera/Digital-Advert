import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 openJoinOrgModal :false,
 userOrganizations : {},
};

const orgSlice = createSlice({
 name: "orgSlice",
 initialState,
 reducers: {
  setOpenJoinOrgModal: (state, { payload }) => {
   state.openJoinOrgModal = payload;
  },
  setUserOrganizations: (state, { payload }) => {
   state.userOrganizations = payload;
  },
 },
});
const { actions, reducer } = orgSlice;

export const {
 setOpenJoinOrgModal,
 setUserOrganizations,
} = actions;
export default reducer;