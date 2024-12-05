const express = require("express");
const router = express.Router();
//todo: ----------------------- ADMIN ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from admin",
  });
});

module.exports = router;
