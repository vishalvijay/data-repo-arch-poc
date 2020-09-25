import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import useUserDetailsRepo from "../../data/useUserDetailsRepo";
import DataLoadingHandler from "../DataLoadingHandler";

const UserDetails: React.FC = () => {
  const userDetailsRepo = useUserDetailsRepo();

  return (
    <Paper>
      <Box p={2}>
        <DataLoadingHandler
          successCode={userDetailsRepo.successCode}
          errorMessage="Failed to load user details"
          onRetry={userDetailsRepo.refresh}
          render={(): JSX.Element => (
            <>
              <Typography gutterBottom variant="h4">
                Name: {userDetailsRepo.data?.name}
              </Typography>
              <Typography gutterBottom>
                Email: {userDetailsRepo.data?.email}
              </Typography>
              <Typography gutterBottom>
                Total votes: {userDetailsRepo.data?.totalVotes}
              </Typography>
            </>
          )}
        />
      </Box>
    </Paper>
  );
};

export default UserDetails;
