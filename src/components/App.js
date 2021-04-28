import React, { Component, useEffect } from "react";
import "../css/App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import { Main } from "./Main";

class App extends Component {



  render() {
    return (
        <Router>
          <Switch>
          <Route exact path="/" component={Main} />
          </Switch>
        </Router>
    );
  }
}

export default App;