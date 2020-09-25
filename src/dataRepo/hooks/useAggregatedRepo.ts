import { useCallback } from "react";

import SuccessCode from "../SuccessCode";
import RepoBase from "../types/RepoBase";

const useAggregatedRepo = (repos: Record<string, RepoBase>): RepoBase => {
  let successCode: SuccessCode | null = null;

  const refreshMethods: (() => void)[] = [];
  const resetMethods: (() => void)[] = [];

  Object.keys(repos).forEach((key) => {
    refreshMethods.push(repos[key].refresh);
    resetMethods.push(repos[key].reset);
    if (successCode !== SuccessCode.failed) {
      const { successCode: currentSuccessCode } = repos[key];

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
