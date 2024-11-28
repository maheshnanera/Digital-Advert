/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openInviteMember: false,
  organization: {},
  organizationMembers: [],
  screenLocations: [],
  openAddMediaModal: false,
  allMedia: [],
  mediaSearchQuery: '',
  mediaFilterType: 'all',
  orgMemberSearchQuery: '',
  orgMemberFilterType: 'name',
  openBillingModal: false,
  openAddCardModal: false,
  noCompatibleData: false,
};

const portalSlice = createSlice({
  name: 'portalSlice',
  initialState,
  reducers: {
    setOpenInviteMember: (state, { payload }) => {
      state.openInviteMember = payload;
    },
    setOrganization: (state, { payload }) => {
      state.organization = payload;
    },
    setOrganizationMembers: (state, { payload }) => {
      state.organizationMembers = payload;
    },
    setScreenLocations: (state, { payload }) => {
      state.screenLocations = payload;
    },
    setOpenAddMediaModal: (state, { payload }) => {
      state.openAddMediaModal = payload;
    },
    setAllMedia: (state, { payload }) => {
      state.allMedia = payload;
    },
    setMediaSearchQuery: (state, { payload }) => {
      state.mediaSearchQuery = payload;
    },
    setMediaFilterType: (state, { payload }) => {
      state.mediaFilterType = payload;
    },
    setOrgMemberSearchQuery: (state, { payload }) => {
      state.orgMemberSearchQuery = payload;
    },
    setOrgMemberFilterType: (state, { payload }) => {
      state.orgMemberFilterType = payload;
    },
    setOpenBillingModal: (state, { payload }) => {
      state.openBillingModal = payload;
    },
    setOpenAddCardModal: (state, { payload }) => {
      state.openAddCardModal = payload;
    },
    setNoCompatibleData: (state, { payload }) => {
      state.noCompatibleData = payload;
    },
  },
});

const { actions, reducer } = portalSlice;

export const {
  setOpenInviteMember,
  setOrganization,
  setOrganizationMembers,
  setScreenLocations,
  setOpenAddMediaModal,
  setAllMedia,
  setMediaSearchQuery,
  setMediaFilterType,
  setOrgMemberFilterType,
  setOrgMemberSearchQuery,
  setOpenBillingModal,
  setOpenAddCardModal,
  setNoCompatibleData,
} = actions;
export default reducer;
