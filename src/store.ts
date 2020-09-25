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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
