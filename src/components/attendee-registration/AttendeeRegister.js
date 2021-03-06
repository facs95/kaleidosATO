import React, { useState } from "react";

import useRegistrationForm from "../CustomHooks";
import { withRouter } from "react-router-dom";
import "./attendee-registration.scss";
// import Loader from "./loader";

const AttendeeRegistration = props => {
  const [loader, setLoader] = useState(false);
  const { inputs, handleInputChange, handleSubmit } = useRegistrationForm(
    props,
    setLoader
  );
  return (
    <div className="registration-container">
      {/* <Loader /> */}
      <div className="registration-tile">
        <header className="registration-header">
          <h3>Kaleido's conference ticket!</h3>
        </header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            className="registration-input"
            onChange={handleInputChange}
            value={inputs.firstName}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            className="registration-input"
            onChange={handleInputChange}
            value={inputs.lastName}
            placeholder="Last Name"
            required
          />
          <input
            type="email"
            name="email"
            className="registration-input"
            onChange={handleInputChange}
            value={inputs.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            className="registration-input"
            onChange={handleInputChange}
            value={inputs.password}
            placeholder="Password"
            required
          />
          {loader ? (
            <button className="registration-btn-loading" type="submit">
              Loading...
            </button>
          ) : (
            <button className="registration-btn" type="submit">
              Purchase
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default withRouter(AttendeeRegistration);
