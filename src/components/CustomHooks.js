import React, { useState, useEffect } from "react";
import axios from "axios";
import { newAttendee } from "../apiURL";

const useRegistrationForm = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }
    const body = {
      content: {
        name: inputs.firstName,
        lastName: inputs.lastName,
        email: inputs.email
      },
      password: inputs.password
    };
    try {
      const newAttendeeInfo = await axios.post(newAttendee, body);
      console.log(newAttendeeInfo);
      // props.history.push('/user/newAttendeeInfo/');
    } catch (err) {
      console.log(err);
    }
  };
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useRegistrationForm;
