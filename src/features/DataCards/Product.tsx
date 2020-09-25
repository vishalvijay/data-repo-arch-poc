import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import useProductRepo from "../../data/useProductRepo";
import DataLoadingHandler from "../DataLoadingHandler";

interface Props {
  productId: number;
}

const Product: React.FC<Props> = ({ productId }) => {
  const productRepo = useProductRepo(productId);

  const product = productRepo.data;

  return (
    <Paper>
      <Box p={2}>
        <DataLoadingHandler
          successCode={productRepo.successCode}
          errorMessage={`Failed to load product with id => ${productId}`}
          onRetry={productRepo.refresh}
          render={(): JSX.Element => (
            <>
              <Typography gutterBottom variant="h4">
                Name: {product?.name}
              </Typography>
              <Typography gutterBottom>
                category: {product?.category}
              </Typography>
              <Typography gutterBottom>id: {product?.id}</Typography>
              <Typography gutterBottom>price: {product?.price}</Typography>
              <Typography gutterBottom>
                quantityAvailable: {product?.quantityAvailable}
              </Typography>
            </>
          )}
        />
      </Box>
    </Paper>
  );
};

export default Product;
