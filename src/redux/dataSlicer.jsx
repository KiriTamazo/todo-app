import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: true,
  error: "",
};

const dataSlicer = createSlice({
  name: "data",
  initialState,
  reducers: {
    success: (state, action) => {
      console.log(state, action.payload);
      return { ...state, data: action.payload, loading: false };
    },
    error: (state, action) => {
      return { ...state, error: action.payload, loading: false };
    },
    loading: (state, action) => {
      return { ...state, loading: false };
    },
  },
});

export const { success, error, loading } = dataSlicer.actions;

export default dataSlicer.reducer;
