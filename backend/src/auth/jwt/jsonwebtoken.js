const jwt = require("jsonwebtoken");
const { jwt: jwtConfig } = require("../../configs/auth.config");

const JWT_KEY = jwtConfig.secret_key;

function issueJWT(user) {
  const _id = user._id;

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000), // Epoch seconds
  };

  const signedToken = jwt.sign(payload, JWT_KEY, {
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
      JWT_KEY,
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
