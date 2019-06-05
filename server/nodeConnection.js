const Web3 = require("web3");
const { RPC_ENDPOINT, USER, PASS } = require("./config");

// HTTP Provider Example
// NOTE: The HTTP Provider is deprecated, as it won't work for subscriptions.
// See: https://web3js.readthedocs.io/en/1.0/web3.html#providers

const nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;

const provider = new Web3.providers.HttpProvider(nodeUrl);
const web3 = new Web3(provider);

exports.generateAddress = generateAddress;

async function generateAddress(password) {
  try {
    const address = await web3.eth.personal.newAccount(password);
    return address;
  } catch (err) {
    throw new Error(err);
  }
}
