const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const PUB_KEY = fs.readFileSync(
  path.join(__dirname, "..", "security/secret/id_rsa.public.pem"),
  "utf8"
);
const PRIV_KEY = fs.readFileSync(
  path.join(__dirname, "..", "security/secret/id_rsa.private.pem"),
  "utf8"
);

function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000), // Epoch seconds
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

function verifyJWT(signedJWT) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      signedJWT,
      PUB_KEY,
      { algorithms: ["RS256"] },
      (err, payload) => {
        if (err) {
          console.error("Token verification failed:", err);
          return reject(false); 
        }
        console.log("Verified payload:", payload);
        return resolve(true); 
      }
    );
  });
}


module.exports = { issueJWT, verifyJWT };
