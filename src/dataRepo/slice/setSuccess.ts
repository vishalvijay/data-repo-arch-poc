import { PayloadAction } from "@reduxjs/toolkit";
import SuccessCode from "../SuccessCode";
import { RepoState } from "../types/RepoState";
import RepoPayload from "../types/RepoPayload";

const setSuccess = (
  state: RepoState,
  { payload }: PayloadAction<RepoPayload>
): void => {
  const newState = state;

  const { data, repoKey } = payload;

  newState[repoKey] = {
    data,
    successCode: SuccessCode.success,
  };
};

export default setSuccess;
