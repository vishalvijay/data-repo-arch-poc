import RepoState from "../types/RepoState";
import RepoPayload from "../types/RepoPayload";

const reset = (
  state: RepoState,
  { payload }: { payload: RepoPayload }
): void => {
  const newState = state;

  const { repoKey } = payload;

  delete newState[repoKey];
};

export default reset;
