import SuccessCode from "../SuccessCode";
import RepoState from "../types/RepoState";
import RepoPayload from "../types/RepoPayload";

const setLoading = (
  state: RepoState,
  { payload }: { payload: RepoPayload }
): void => {
  const newState = state;

  const { repoKey } = payload;

  newState[repoKey] = newState[repoKey] || {
    data: null,
  };

  newState[repoKey].successCode = SuccessCode.loading;
};

export default setLoading;
