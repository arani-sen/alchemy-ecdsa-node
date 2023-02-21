const secp = require("ethereum-cryptography/secp256k1");
const {toHex} = utils = require("ethereum-cryptography/utils")
const {keccak256} = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('private key:',toHex(privateKey));

const publicAddress = keccak256(secp.getPublicKey(privateKey).slice(1)).slice(-20);
console.log('public key:', toHex(publicAddress))



// private key: ae828803c08f819458dee8bc63278d99e5051e52618b34ba5fdd4518e1fcc347
// public key: bd02cb08059be3fcd67b9eded906193561bb189b

// private key: 429f4cad40177fd21472268406ea26b0800c58c6d422f1031ed450443a1359db
// public key: 0490a33f133d73c468bab8ec2912ca064c604688

// private key: 02b12c643750e335d50beb01c51fa17a27e27cd01eb89058baa40a3a710c43ad
// public key: 73037f767da65614a78bea076b2c711dcd938141
