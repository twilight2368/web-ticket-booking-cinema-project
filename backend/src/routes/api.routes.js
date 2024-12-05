const express = require("express");
const router = express.Router();
//todo: ----------------------- APP ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from API",
  });
});

module.exports = router;
