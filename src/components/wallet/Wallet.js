import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

import './wallet.scss';

const Wallet = props => {
  const [address, setAddress] = useState('');
  useEffect(() => {
    setAddress(props.match.params.wallet);
  });
  return (
    <div className="wallet-tile">
      <QRCode value={address} size={200} />
      <p className="address">Eth Address: {address}</p>
    </div>
  );
};

export default Wallet;
