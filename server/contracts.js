import { TOKEN_FACTORY_URL, OWNER_ADDRESS, USER, PASS } from "./config";
import axios from "axios";

exports.mint = mint;

async function mint(address, URI) {
  const body = {
    from: OWNER_ADDRESS,
    toAddress: address,
    tokenId: URI,
    tokenURI: URI
  };
  const auth = {
    username: USER,
    password: PASS
  };
  try {
    const response = await axios.post(TOKEN_FACTORY_URL, { auth, body });
    console.log(response);
  } catch (err) {
    throw new Error(err);
  }
}
