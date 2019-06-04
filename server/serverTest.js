const ipfs = require("./ipfs.js");

async function get() {
  const response = await ipfs.get(
    "QmXb3aTJVhDqRvzUdsTR2zszPHyuTxEvj5UfCkHcHH2nwx"
  );

  console.log(response);
}

get();
