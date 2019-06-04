const Web3 = require("web3");
const { USER, PASS, RPC_ENDPOINT } = require("./config");

// HTTP Provider Example
// NOTE: The HTTP Provider is deprecated, as it won't work for subscriptions.
// See: https://web3js.readthedocs.io/en/1.0/web3.html#providers

let nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;

let provider = new Web3.providers.HttpProvider(nodeUrl);
let web3 = new Web3(provider);

exports.generateAddress = generateAddress;

async function generateAddress(password) {
  const address = await web3.eth.personal.newAccount(password);
  return address;
}
