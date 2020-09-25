import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./features/HomePage";
import OtherPage from "./features/OtherPage";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/other-page">Other</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/other-page">
              <OtherPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
};

export default App;
