import { Venues } from "./Venues.js";
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Venue } from "./Venue.js";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Venues />
          </Route>
          <Route path="/venue/:id" children={<Venue />} />
        </Switch>
      </div>
    </Router>
  );
}


