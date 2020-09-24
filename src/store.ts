import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import repoSlice from "./dataRepo/slice";

const store = configureStore({
  reducer: combineReducers({
    [repoSlice.name]: repoSlice.reducer,
  }),
  devTools: true,
});

export default store;
