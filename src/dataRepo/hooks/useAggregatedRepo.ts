import { useCallback } from "react";

import SuccessCode from "../SuccessCode";
import RepoBase from "../types/RepoBase";

const useAggregatedRepo = (repos: RepoBase[]): RepoBase => {
  let successCode: SuccessCode | null = null;

  const refreshMethods: (() => void)[] = [];
  const resetMethods: (() => void)[] = [];

  repos.forEach((r) => {
    refreshMethods.push(r.refresh);
    resetMethods.push(r.reset);
    if (successCode !== SuccessCode.failed) {
      const { successCode: currentSuccessCode } = r;

      if (
        successCode === null ||
        (currentSuccessCode !== SuccessCode.success &&
          currentSuccessCode !== successCode)
      ) {
        successCode = currentSuccessCode;
      }
    }
  });

  const refresh = useCallback(() => {
    refreshMethods.forEach((rMethod) => rMethod());
  }, [refreshMethods]);

  const reset = useCallback(() => {
    resetMethods.forEach((rMethod) => rMethod());
  }, [resetMethods]);

  return {
    successCode: successCode === null ? SuccessCode.loading : successCode,
    refresh,
    reset,
  };
};

export default useAggregatedRepo;
