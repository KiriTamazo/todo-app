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
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.filter((item) => item.id !== action.payload.id);
    },
    editTodo: (state, action) => {},
  },
});

export const { success, error, loading, addTodo, deleteTodo, editTodo } =
  dataSlicer.actions;

export default dataSlicer.reducer;
