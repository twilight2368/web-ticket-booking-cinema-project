const express = require("express");
const router = express.Router();
//todo: ----------------------- APP ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from API",
  });
});

//todo: Get all movies what will be shown on today and the next 2 days
router.get("/now-movies",);

module.exports = router;
