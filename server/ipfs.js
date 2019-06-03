const { INFURA_URL, INFURA_PORT } = require("config");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient(INFURA_URL, INFURA_PORT, { protocol: "https" });

exports.send = send;
exports.get = get;

async function send(content) {
  try {
    const data = JSON.stringify(content);
    const contentToSend = ipfsClient.Buffer.from(data);
    const results = await ipfs.add(contentToSend);
    console.log(results);
  } catch (err) {
    console.log(err);
  }
}

export async function get(CID) {
  try {
    const response = await ipfs.get(CID);
    response.forEach(file => {
      console.log(file.path);
      console.log(file.content.toString("utf8"));
    });
  } catch (err) {
    console.log(err);
  }
}
