const { verifyJWT } = require("../auth/jwt/jsonwebtoken");
const cliColor = require("cli-color");
const AdminModel = require("../models/database/Admin");

async function checkIsSessionValid(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Session Unauthorized" });
  }
}

async function checkLoggedIn(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    const verifyToken = await verifyJWT(token);

    if (verifyToken.status) {
      next();
    } else {
      return res.status(401).json({ message: "Token Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!!!",
    });
  }
}

async function checkAdminLogin(req, res, next) {
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No token provided, unauthorized." });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token format is invalid." });
    }

    const verifyToken = await verifyJWT(token);

    if (verifyToken.status) {
      const admin = await AdminModel.findById(verifyToken.decoded.sub);

      if (!admin) {
        return res.status(401).json({ message: "Token Unauthorized" });
      }
      next();
    } else {
      return res.status(401).json({ message: "Token Unauthorized" });
    }
  } catch (error) {
    next(error);
  }
}

async function checkCookie(req, res, next) {
  console.log(cliColor.red("Cookies:"), req.cookies); // Access parsed cookies
  // Or
  console.log(cliColor.red("Raw Cookies:"), req.headers.cookie); // Access raw cookie header
  next();
}

module.exports = {
  checkCookie,
  checkLoggedIn,
  checkIsSessionValid,
  checkAdminLogin,
};
