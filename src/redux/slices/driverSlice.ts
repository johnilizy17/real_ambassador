import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

const initialState = {
  user: {},
  isOnboarded: true,
  editState: false
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setDisplay: (state) => {
      state.isOnboarded = false;
    },
    setEdit: (state) => {
      state.editState = true;
    },
    setOnboarded: (state, { payload }) => {
      state.isOnboarded = payload;
    },
    clearSession: (state) => {
      state.user = {};
    },
    editDetails: (state, { payload }) => {
      state.editState = payload
    }
  }
});

export const { clearSession, setOnboarded, setUser, editDetails, setDisplay, setEdit } = portfolioSlice.actions;

export default portfolioSlice.reducer;