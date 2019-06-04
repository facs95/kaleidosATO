const Web3 = require("web3");

let USER = "u0t1293jdc";
let PASS = "PqaJut1EqDbvXdUeUXIoWtAKFhlWihzhFf5xWvdZfD8";
let RPC_ENDPOINT = "u0kl4qmjzq-u0ybsl9eqc-rpc.us0-aws.kaleido.io"; // Remove the leading https://

// HTTP Provider Example
// NOTE: The HTTP Provider is deprecated, as it won't work for subscriptions.
// See: https://web3js.readthedocs.io/en/1.0/web3.html#providers

let nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;

let provider = new Web3.providers.HttpProvider(nodeUrl);
let web3 = new Web3(provider);

// web3.eth.getBlock("latest").then(latestBlock => {
//   console.log("Latest Block Via HTTP Provider: ");
//   console.log(latestBlock);
//   // Stop the program once this has finished
//   process.exit();
// });

// web3.eth.personal.newAccount("!@superpassword").then(console.log);

web3.eth.personal
  .unlockAccount(
    "0x942fE5e8E506650c6Fa599b580F19e6CD3EbdeA1",
    "!@superpassword",
    600
  )
  .then(console.log("Account unlocked!"));

web3.eth
  .getBalance("0x942fE5e8E506650c6Fa599b580F19e6CD3EbdeA1")
  .then(console.log);
