import React from "react";
import { Box, Typography, Button } from "@material-ui/core";

interface Props {
  message: string;
  onRetry?: () => void;
}

const ApiError: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <Box textAlign="center">
      <Typography color="error">{message}</Typography>
      {onRetry && (
        <>
          <Box mb={2} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={onRetry}
            size="small"
          >
            Retry
          </Button>
        </>
      )}
    </Box>
  );
};

export default ApiError;
