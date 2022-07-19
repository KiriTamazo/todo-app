import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlicer";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
export default store;
