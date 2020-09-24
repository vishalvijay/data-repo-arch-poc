import { createSlice } from "@reduxjs/toolkit";
import setLoading from "./setLoading";
import setFailed from "./setFailed";
import setSuccess from "./setSuccess";
import reset from "./reset";
import RepoState from "../types/RepoState";

const slice = createSlice({
  name: "repoSlice",
  initialState: {} as RepoState,
  reducers: {
    setLoading,
    setFailed,
    setSuccess,
    reset,
  },
});

export default slice;
