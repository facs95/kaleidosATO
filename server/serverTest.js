const Web3 = require("web3");
const ATOTContract = require("./contracts/ERC721Kaleido.json");
const {
  TOKEN_FACTORY_URL,
  CONTRACT_ATOT_ADDRESS,
  CONTRACT_ATOC_ADDRESS,
  OWNER_ADDRESS,
  USER,
  PASS,
  RPC_ENDPOINT
} = require("./config");
const base64 = require("base-64");

// let USER = "u0t1293jdc";
// let PASS = "PqaJut1EqDbvXdUeUXIoWtAKFhlWihzhFf5xWvdZfD8";
// let RPC_ENDPOINT = "u0kl4qmjzq-u0ybsl9eqc-rpc.us0-aws.kaleido.io"; // Remove the leading https://

// HTTP Provider Example
// NOTE: The HTTP Provider is deprecated, as it won't work for subscriptions.
// See: https://web3js.readthedocs.io/en/1.0/web3.html#providers

let nodeUrl = "https://" + USER + ":" + PASS + "@" + RPC_ENDPOINT;
let provider = new Web3.providers.HttpProvider(nodeUrl);
let web3 = new Web3(provider);
contractAccess = new web3.eth.Contract(ATOTContract.abi, CONTRACT_ATOT_ADDRESS);
// console.log(contractAccess.jsonInterface);
async function uri(address) {
  const response = await contractAccess.methods
    .tokenURI(address)
    .call({ from: OWNER_ADDRESS });
  console.log(response);
}

// uri("0x8fcA1Bb6221d023e317B70f8c5d3584f0E7C338e");
// // uri();
// async function mint(address, Uri) {
//   const response = await contractAccess.methods
//     .mintWithTokenURI(address, address, Uri)
//     .call({ from: OWNER_ADDRESS });
//   console.log(response);
// }
// async function burn(address) {
//   const response = await contractAccess.methods
//     .burn(address)
//     .call({ from: OWNER_ADDRESS });
//   console.log(response);
// }

// // mint("0xbDcfEB0D1Af68562CC2CBa68482CD143eAb2fF10", "78906");
// // burn("0xf8676311f1eDa25E74285427d0067fD195dE45e0");
// async function balance(address) {
//   const response = await contractAccess.methods
//     .balanceOf(address)
//     .call({ from: OWNER_ADDRESS });
//   console.log(response);
// }
// balance("0x9d5c258387C313262eF9148FD817c07F686Cb8EF");

// web3.eth.getBlock("latest").then(latestBlock => {
//   console.log("Latest Block Via HTTP Provider: ");
//   console.log(latestBlock);
//   // Stop the program once this has finished
//   process.exit();
// });

// web3.eth.personal.newAccount("!@superpassword").then(console.log);

// web3.eth.personal
//   .unlockAccount(
//     "0x942fE5e8E506650c6Fa599b580F19e6CD3EbdeA1",
//     "!@superpassword",
//     600
//   )
//   .then(console.log("Account unlocked!"));

// web3.eth
//   .getBalance("0x942fE5e8E506650c6Fa599b580F19e6CD3EbdeA1")
//   .then(console.log);

const axios = require("axios");

// // // exports.mint = mint;

// async function mint(address, URI) {
//   const data = {
//     from: OWNER_ADDRESS,
//     toAddress: address,
//     tokenId: address,
//     tokenURI: URI
//   };
//   const auth = {
//     username: USER,
//     password: PASS
//   };
//   const token = base64.encode(`${USER}:${PASS}`);
//   console.log(token);
//   try {
//     const response = await axios.post(
//       `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/mint`,
//       data,
//       {
//         headers: {
//           Authorization: `Basic ${token}`
//         }
//       }
//     );
//     console.log(response);
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// async function transferCredits(address, amount) {
//   const data = {
//     amount: amount,
//     from: OWNER_ADDRESS,
//     toAddress: address
//   };
//   const token = base64.encode(`${USER}:${PASS}`);
//   console.log(token);
//   try {
//     const response = await axios.post(
//       `${TOKEN_FACTORY_URL}/${CONTRACT_ATOC_ADDRESS}/transfer`,
//       data,
//       {
//         headers: {
//           Authorization: `Basic ${token}`
//         }
//       }
//     );
//     console.log(response);
//     return response;
//   } catch (err) {
//     throw new Error(err);
//   }
// }
// async function mint(address, URI) {
//   const data = {
//     from: OWNER_ADDRESS,
//     toAddress: address,
//     tokenId: address,
//     tokenURI: URI
//   };
//   const auth = {
//     username: USER,
//     password: PASS
//   };
//   const token = base64.encode(`${USER}:${PASS}`);
//   console.log(token);
//   try {
//     const response = await axios.post(
//       `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/mint`,
//       data,
//       {
//         headers: {
//           Authorization: `Basic ${token}`
//         }
//       }
//     );
//     console.log(response);
//   } catch (err) {
//     throw new Error(err);
//   }
// }
// transferCredits("0x9d5c258387C313262eF9148FD817c07F686Cb8EF", "5");
// mint("0x9d5c258387C313262eF9148FD817c07F686Cb8EF", "34567");

// async function getBalanceTicket(address) {
//   const token = base64.encode(`${USER}:${PASS}`);
//   // console.log(token);
//   try {
//     const response = await axios.get(
//       `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/balanceOf/${address}`,
//       {
//         headers: {
//           Authorization: `Basic ${token}`
//         }
//       }
//     );
//     console.log(response.data.balance);
//     // return response.data.balance;
//   } catch (err) {
//     throw new Error(err);
//   }
// }
async function burn(address) {
  const data = {
    from: OWNER_ADDRESS,
    tokenId: address
  };

  const token = base64.encode(`${USER}:${PASS}`);
  console.log(token);
  try {
    const response = await axios.post(
      `${TOKEN_FACTORY_URL}/${CONTRACT_ATOT_ADDRESS}/burn`,
      data,
      {
        headers: {
          Authorization: `Basic ${token}`
        }
      }
    );
    console.log(response);
  } catch (err) {
    throw new Error(err);
  }
}
burn("0x8fcA1Bb6221d023e317B70f8c5d3584f0E7C338e");
