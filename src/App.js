import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./state/common/store";

import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={LandingPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
