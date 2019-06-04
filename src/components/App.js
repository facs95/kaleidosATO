import React from "react";
import { Route } from "react-router-dom";

import QRReader from "./QRReader";
import AttendeeRegister from "./AttendeeRegister";
import Wallet from "./Wallet";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/qr-reader" component={QRReader} />
      <Route exact path="/register" component={AttendeeRegister} />
      <Route exact path="/user/:wallet" component={Wallet} />
    </div>
  );
}

export default App;
