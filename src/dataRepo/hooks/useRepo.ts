import { useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import generateUniqueId from "../utils/generateUniqueId";
import SuccessCode from "../SuccessCode";
import repoSlice from "../slice";
import Repo from "../types/Repo";
import { RootState } from "../../store";
import { RepoState } from "../types/RepoState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type runType<T> = (...args: any[]) => Promise<T>;

const handleRun = async <T>(
  run: runType<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[],
  repoKey: string,
  actions: typeof repoSlice.actions
): Promise<void> => {
  try {
    actions.setLoading({ repoKey });
    const data = await run(...args);
    actions.setSuccess({
      repoKey,
      data,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Failed to load ${repoKey}`, error);
    actions.setFailed({ repoKey });
  }
};

const useRepo = <T>(
  repoKey: string,
  run: runType<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
): Repo<T> => {
  const argsBasedRepoKey = useMemo(
    () => `${repoKey}_${generateUniqueId(args, repoKey)}`,
    [args, repoKey]
  );

  const repo = useSelector(
    (state: RootState) => (state[repoSlice.name] as RepoState)[argsBasedRepoKey]
  );

  const dispatch = useDispatch();
  const actions = useMemo(
    () => bindActionCreators(repoSlice.actions, dispatch),
    [dispatch]
  );

  const reset = useCallback(() => {
    actions.reset({
      repoKey: argsBasedRepoKey,
    });
  }, [actions, argsBasedRepoKey]);

  const refresh = useCallback(() => {
    handleRun(run, args, argsBasedRepoKey, actions);
  }, [run, args, argsBasedRepoKey, actions]);

  const result = useMemo(() => {
    const newRepo = repo || {
      data: null,
      successCode: SuccessCode.loading,
    };

    return {
      ...newRepo,
      reset,
      refresh,
    } as Repo<T>;
  }, [repo, reset, refresh]);

  useEffect(() => {
    if (!repo) {
      handleRun(run, args, argsBasedRepoKey, actions);
    }
  }, [actions, args, argsBasedRepoKey, repo, run]);

  return result;
};

export default useRepo;
