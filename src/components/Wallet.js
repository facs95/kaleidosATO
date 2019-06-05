import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";

const Wallet = props => {
  const [address, setAddress] = useState("");
  useEffect(() => {
    setAddress(props.match.params.wallet);
    console.log(typeof address);
  });
  return (
    <div>
      <QRCode value={address} size="200" />

      <p>Eth Address: {address}</p>
    </div>
  );
};

export default Wallet;
