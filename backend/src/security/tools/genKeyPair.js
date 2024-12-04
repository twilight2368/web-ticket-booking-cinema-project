const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function genKeyPair() {
  //TODO: Generates an object where the keys are stored in properties `privateKey` and `publicKey`
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096, //? bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", //* "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", //* "Public Key Cryptography Standards 1"
      format: "pem", // Most common formatting choice
    },
  });

  //!NOTE: The public key will be publish on Github for example and for keep the folder 'secret' not disappear when commit and push
  //TODO: Create the public key file
  fs.writeFileSync(
    path.join(__dirname, "..") + "/secret/id_rsa.public.pem",
    keyPair.publicKey
  );

  //TODO: Create the private key file
  fs.writeFileSync(
    path.join(__dirname, "..") + "/secret/id_rsa.private.pem",
    keyPair.privateKey
  );
}

//TODO: Generates the keypair
genKeyPair();
