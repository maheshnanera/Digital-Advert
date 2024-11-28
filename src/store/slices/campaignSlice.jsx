/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openNewCampaignModal: false,
  newCampaign: null,
  allCampaign: [],
  campaignSearchQuery: '',
  campaignFilterType: 'title',
};

const campaignSlice = createSlice({
  name: 'campaignSlice',
  initialState,
  reducers: {
    setOpenNewCampaignModal: (state, { payload }) => {
      state.openNewCampaignModal = payload;
    },
    setNewCampaign: (state, { payload }) => {
      state.newCampaign = payload;
    },
    setAllCampaign: (state, { payload }) => {
      state.allCampaign = payload;
    },
    setCampaignSearchQuery: (state, { payload }) => {
      state.campaignSearchQuery = payload;
    },
    setCampaignFilterType: (state, { payload }) => {
      state.campaignFilterType = payload;
    },
  },
});

const { actions, reducer } = campaignSlice;

export const {
  setOpenNewCampaignModal,
  setNewCampaign,
  setAllCampaign,
  setCampaignSearchQuery,
  setCampaignFilterType,
} = actions;
export default reducer;
