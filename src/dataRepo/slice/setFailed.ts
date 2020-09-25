import { PayloadAction } from "@reduxjs/toolkit";
import SuccessCode from "../SuccessCode";
import { RepoState } from "../types/RepoState";
import RepoPayload from "../types/RepoPayload";

const setFailed = (
  state: RepoState,
  { payload }: PayloadAction<RepoPayload>
): void => {
  const newState = state;

  const { repoKey } = payload;

  newState[repoKey] = newState[repoKey] || {
    data: null,
  };

  newState[repoKey].successCode = SuccessCode.failed;
};

export default setFailed;
