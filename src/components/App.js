import React from "react";
import { Route } from "react-router-dom";

import QRReader from "./QRReader";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/qr-reader" component={QRReader} />
    </div>
  );
}

export default App;
