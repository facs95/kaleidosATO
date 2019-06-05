import React from "react";

import "./loader.scss";

const Loader = props => {
  return (
    <div class="loader-container">
      <div class="loader">Loading...</div>
      <div class="overlay" />
    </div>
  );
};

export default Loader;
