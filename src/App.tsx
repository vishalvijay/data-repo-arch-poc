import { Box, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container/Container";
import React from "react";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App sample
        </Typography>
      </Box>
    </Container>
  );
};

export default App;
