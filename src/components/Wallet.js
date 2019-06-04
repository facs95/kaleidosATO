import React from "react";
import QRCode from "qrcode.react";
// import useRegistrationForm from "./CustomHooks";
// import { addIpfsForm, getNewAddress } from "../apiURL";
// import axios from "axios";

function Wallet() {
  return (
    <div>
      <QRCode value="someStringtoUSe" size="150" />
    </div>
  );
}

export default Wallet;
