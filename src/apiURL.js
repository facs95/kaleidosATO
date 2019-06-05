// PROD
export const getNewAddress = "http://192.168.1.246:4000/address";
export const addIpfsForm = "http://192.168.1.246:4000/add";
export const newAttendee = "http://192.168.1.246:4000/newAttendee";
export const getValidateAttendee = address =>
  `http://localhost:4000/validateAttendee/${address}`;
