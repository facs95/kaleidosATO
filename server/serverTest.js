const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient("ipfs.infura.io", "5001", { protocol: "https" });

const content = {
  name: "Freddy",
  lastName: "Caceres",
  age: "24",
  occupation: "developer",
  email: "facs95@gmail.com"
};

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

const validCID = "QmXb3aTJVhDqRvzUdsTR2zszPHyuTxEvj5UfCkHcHH2nwx";
async function get(CID) {
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
// send(content);

get(validCID);
