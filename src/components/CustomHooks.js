import { useState } from "react";
import axios from "axios";
import { newAttendee } from "../apiURL";

const useRegistrationForm = props => {
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
      props.history.push(`/user/${newAttendeeInfo.data.address}`);
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
