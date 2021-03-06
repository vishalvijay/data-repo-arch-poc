import React from "react";
import { Container, Grid } from "@material-ui/core";
import UserDetails from "../DataCards/UserDetails";
import Product from "../DataCards/Product";

const Page2: React.FC = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserDetails />
          </Grid>
          <Grid item xs={12} md={6}>
            <Product productId={200} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Product productId={140} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Product productId={200} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Page2;
