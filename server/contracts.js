const {
  TOKEN_FACTORY_URL,
  CONTRACT_ATOT_ADDRESS,
  CONTRACT_ATOC_ADDRESS,
  OWNER_ADDRESS,
  RPC_ENDPOINT,
  USER,
  PASS
} = require("./config");
const Web3 = require("web3");
const ATOTContract = require("./contracts/ERC721Kaleido.json");
const axios = require("axios");
const base64 = require("base-64");

let nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;
let provider = new Web3.providers.HttpProvider(nodeUrl);
let web3 = new Web3(provider);
contractAccess = new web3.eth.Contract(ATOTContract.abi, CONTRACT_ATOT_ADDRESS);

exports.mintToken = mintToken;
exports.transferCredits = transferCredits;
exports.getURI = getURI;
exports.getBalanceTicket = getBalanceTicket;
exports.getBalanceCredits = getBalanceCredits;

async function mintToken(address, URI) {
  const data = {
    from: OWNER_ADDRESS,
    toAddress: address,
    tokenId: address,
    tokenURI: URI
  };
  const token = base64.encode(`${USER}:${PASS}`);
  console.log(token);
  try {
    const response = await axios.post(
      `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/mint`,
      data,
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    return response.status;
  } catch (err) {
    throw new Error(err);
  }
}

async function transferCredits(address, amount) {
  const data = {
    amount: amount,
    from: OWNER_ADDRESS,
    toAddress: address
  };
  const token = base64.encode(`${USER}:${PASS}`);
  try {
    const response = await axios.post(
      `${TOKEN_FACTORY_URL}/${CONTRACT_ATOC_ADDRESS}/transfer`,
      data,
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    console.log(response);
    return response.status;
  } catch (err) {
    throw new Error(err);
  }
}

async function getURI(address) {
  const response = await contractAccess.methods
    .tokenURI(address)
    .call({ from: OWNER_ADDRESS });
  return response;
}

async function getBalanceTicket(address) {
  const token = base64.encode(`${USER}:${PASS}`);
  try {
    const response = await axios.get(
      `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/balanceOf/${address}`,
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    // console.log(response.data.balance);
    return response.data.balance;
  } catch (err) {
    throw new Error(err);
  }
}

async function getBalanceCredits(address) {
  const token = base64.encode(`${USER}:${PASS}`);
  try {
    const response = await axios.get(
      `${TOKEN_FACTORY_URL}/${CONTRACT_ATOC_ADDRESS}/balanceOf/${address}`,
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    // console.log(response.data.balance);
    return response.data.balance;
  } catch (err) {
    throw new Error(err);
  }
}
