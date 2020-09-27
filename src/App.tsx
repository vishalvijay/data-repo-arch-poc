import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Page1 from "./features/Page1";
import Page2 from "./features/Page2";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Page 1</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>

        <hr />

        <Switch>
          <Route exact path="/">
            <Page1 />
          </Route>
          <Route path="/page-2">
            <Page2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
