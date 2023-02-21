import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {hexToBytes,toHex} from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKeyInput = evt.target.value;
    setPrivateKey(privateKeyInput);
    const address = toHex(keccak256(secp.getPublicKey(hexToBytes(privateKeyInput)).slice(1)).slice(-20));

    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Enter Private Key
        <input placeholder="Insert Private Key" value={privateKey} onChange={onChange}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
