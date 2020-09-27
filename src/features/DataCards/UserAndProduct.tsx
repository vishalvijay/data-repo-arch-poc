import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import useUserDetailsRepo from "../../data/useUserDetailsRepo";
import useProductRepo from "../../data/useProductRepo";
import DataLoadingHandler from "../DataLoadingHandler";
import useAggregatedRepo from "../../dataRepo/hooks/useAggregatedRepo";

const UserAndProduct: React.FC = () => {
  const userDetailsRepo = useUserDetailsRepo();
  const productRepo = useProductRepo(23);

  const aggregatedRepo = useAggregatedRepo([userDetailsRepo, productRepo]);

  return (
    <Paper>
      <Box p={2}>
        <DataLoadingHandler
          successCode={aggregatedRepo.successCode}
          errorMessage="Failed to load user details or product details"
          onRetry={aggregatedRepo.refresh}
          render={(): JSX.Element => (
            <>
              <Typography gutterBottom variant="caption">
                Aggregated repo example. User details and product is a
                dependency for this card.
              </Typography>
              <Typography gutterBottom variant="h5">
                User name: {userDetailsRepo.data?.name}
              </Typography>
              <Typography gutterBottom variant="h5">
                Product name: {productRepo.data?.name}
              </Typography>
            </>
          )}
        />
      </Box>
    </Paper>
  );
};

export default UserAndProduct;
