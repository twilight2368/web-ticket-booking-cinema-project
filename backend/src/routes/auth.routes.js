const express = require("express");
const router = express.Router();
//todo: ----------------------- AUTH ROUTES --------------------------------------

router.get("/", (req, res) => {
  return res.json({
    message: "Hello world",
  });
});

module.exports = router;
