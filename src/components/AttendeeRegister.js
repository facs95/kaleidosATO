import React from "react";

import useRegistrationForm from "./CustomHooks";
import { withRouter } from "react-router-dom";
import "./register-form.scss";
// import Loader from "./loader";

const AttendeeRegister = props => {
  const { inputs, handleInputChange, handleSubmit } = useRegistrationForm(
    props
  );
  return (
    <div className="request-form">
      {/* <Loader /> */}
      <form onSubmit={handleSubmit}>
        <div className="request-fields">
          <div>
            <h3 className="request-form-header">
              Welcome to Kaleido's Conference!
            </h3>
          </div>
          <div>
            {/* <label>First Name</label> */}
            <input
              type="text"
              name="firstName"
              className="request-input"
              onChange={handleInputChange}
              value={inputs.firstName}
              placeholder="First Name"
              required
            />
          </div>
          {/* <label>Last Name</label> */}
          <div>
            <input
              type="text"
              name="lastName"
              className="request-input"
              onChange={handleInputChange}
              value={inputs.lastName}
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            {/* <label>Email Address</label> */}
            <input
              type="email"
              name="email"
              className="request-input"
              onChange={handleInputChange}
              value={inputs.email}
              placeholder="Email"
              required
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              type="password"
              name="password"
              className="request-input"
              onChange={handleInputChange}
              value={inputs.password}
              placeholder="Password"
            />
          </div>
          <div>
            <button className="request-btn" type="submit">
              Purchase
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(AttendeeRegister);
