const { INFURA_URL, INFURA_PORT } = require("./config");
const ipfsClient = require("ipfs-http-client");

//INITIALIZING IPGS CLIENT
const ipfs = ipfsClient(INFURA_URL, INFURA_PORT, { protocol: "https" });

exports.send = send;
exports.get = get;

//SEND DATA TO IPFS
async function send(content) {
  try {
    const data = JSON.stringify(content);
    console.log(data);
    const contentToSend = ipfsClient.Buffer.from(data);
    const results = await ipfs.add(contentToSend);
    console.log(results);
    return results[0].hash;
  } catch (err) {
    throw new Error(err);
  }
}

//GET DATA FROM IPFS
async function get(CID) {
  try {
    const response = await ipfs.get(CID);
    let data;
    response.forEach(file => {
      console.log(file.path);
      data = file.content.toString("utf8");
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
