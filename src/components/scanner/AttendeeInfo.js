import React from "react";
import PropTypes from "prop-types";

export default function AttendeeInfo({ attendeeInfoResponse }) {
  console.log(attendeeInfoResponse);
  if (!attendeeInfoResponse) {
    return null;
  }
  const { attendeeInfo, hasTicket } = attendeeInfoResponse;
  if (hasTicket) {
    const { firstName, lastName, credits } = attendeeInfo;
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

// AttendeeInfo.propTypes = {
//   attendeeInfoResponse: PropTypes.shape({
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     credits: PropTypes.number
//   }).isRequired
// };
