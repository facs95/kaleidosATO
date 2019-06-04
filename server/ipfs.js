const { INFURA_URL, INFURA_PORT } = require("./config");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient(INFURA_URL, INFURA_PORT, { protocol: "https" });

exports.send = send;
exports.get = get;

async function send(content) {
  try {
    const data = JSON.stringify(content);
    const contentToSend = ipfsClient.Buffer.from(data);
    const results = await ipfs.add(contentToSend);
    return results[0].hash;
  } catch (err) {
    throw new Error(err);
  }
}

async function get(CID) {
  try {
    const response = await ipfs.get(CID);
    let data;
    response.forEach(file => {
      data = file.content.toString("utf8");
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
}
