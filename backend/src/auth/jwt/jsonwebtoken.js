const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { jwt: jwtConfig } = require("../../configs/auth.config");

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

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000), // Epoch seconds
  };

  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: jwtConfig.algorithm,
  });

  return {
    token: signedToken,
    expires: jwtConfig.expiresIn,
  };
}

function verifyJWT(signedJWT) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      signedJWT,
      PUB_KEY,
      { algorithms: [jwtConfig.algorithm] },
      (err, payload) => {
        if (err) {
          console.error("Token verification failed:", err);
          return reject({
            status: false,
            decode: undefined,
          });
        }
        console.log("Verified payload:", payload);
        return resolve({
          status: true,
          decoded: payload,
        });
      }
    );
  });
}

module.exports = { issueJWT, verifyJWT };
