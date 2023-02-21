const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1")
const {keccak256} = require("ethereum-cryptography/keccak")
const {utf8ToBytes, hexToBytes} = require("ethereum-cryptography/utils")
app.use(cors());
app.use(express.json());

const balances = {
  "bd02cb08059be3fcd67b9eded906193561bb189b": 100,
  "0490a33f133d73c468bab8ec2912ca064c604688": 50,
  "73037f767da65614a78bea076b2c711dcd938141": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { signature,recoveryBit, amount, recipient } = req.body;

  const transfer = {
    amount, recipient
  }
  const hashedData = keccak256(utf8ToBytes(JSON.stringify(transfer)));
  
  const sender = secp.recoverPublicKey(hashedData,signature , recoveryBit);
  const senderAddress = toHex(keccak256(sender.slice(1)).slice(-20));

  setInitialBalance(senderAddress);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
