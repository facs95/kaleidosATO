import React from "react";

import useRegistrationForm from "./CustomHooks";
import { withRouter } from "react-router-dom";

const AttendeeRegister = props => {
  const { inputs, handleInputChange, handleSubmit } = useRegistrationForm(
    props
  );
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          onChange={handleInputChange}
          value={inputs.firstName}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          onChange={handleInputChange}
          value={inputs.lastName}
          required
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={inputs.email}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          value={inputs.password}
        />
      </div>

      <button type="submit">Purchase</button>
    </form>
  );
};

export default withRouter(AttendeeRegister);
