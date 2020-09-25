import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import ApiError from "./ApiError";
import SuccessCode from "../dataRepo/SuccessCode";

type Height = string | number;

interface Props {
  render?: () => JSX.Element | null;
  successCode: SuccessCode;
  errorMessage?: string;
  onRetry?: () => void;
  height?: Height;
  minHeight?: Height;
  progressSize?: number;
}

const DataLoadingHandler: React.FC<Props> = (props) => {
  const {
    successCode,
    errorMessage,
    onRetry,
    height,
    minHeight,
    render,
    progressSize,
  } = props;

  if (successCode === SuccessCode.success) return render ? render() : null;

  return (
    <Box
      height={height}
      minHeight={minHeight}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {successCode === SuccessCode.loading && (
        <CircularProgress color="secondary" size={progressSize} />
      )}
      {errorMessage && successCode === SuccessCode.failed && (
        <ApiError message={errorMessage} onRetry={onRetry} />
      )}
    </Box>
  );
};

DataLoadingHandler.defaultProps = {
  progressSize: 40,
};

export default DataLoadingHandler;
