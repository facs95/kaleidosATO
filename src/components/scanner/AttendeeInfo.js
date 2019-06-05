import React from "react";
import PropTypes from "prop-types";

export default function AttendeeInfo({ attendeeInfo }) {
  if (!attendeeInfo) {
    return null;
  }
  const { firstName, lastName, credits, hasTicket } = attendeeInfo;
  if (hasTicket) {
    return (
      <div>
        <h1>
          Welcome, {firstName} {lastName}
        </h1>
        <h2>You have {credits} credits to spend today!</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry! You have not purchased a ticket</h1>
      </div>
    );
  }
}

AttendeeInfo.propTypes = {
  attendeeInfo: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    credits: PropTypes.string
  }).isRequired
};
