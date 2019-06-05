import React from "react";
import { Route } from "react-router-dom";

import Scanner from "./scanner/Scanner";
import AttendeeRegister from "./attendee-registration/AttendeeRegister";
import Wallet from "./wallet/Wallet";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/scanner" component={Scanner} />
      <Route exact path="/register" component={AttendeeRegister} />
      <Route exact path="/user/:wallet" component={Wallet} />
      <div className="background-cut" />
    </div>
  );
}

export default App;
