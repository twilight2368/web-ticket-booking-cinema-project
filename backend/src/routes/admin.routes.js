const express = require("express");
const router = express.Router();

const { checkAdminLogin } = require("../middlewares/auth.middleware");
const authConfig = require("../configs/auth.config");

const Admin = require("../models/database/Admin");
// todo: ----------------------- ADMIN ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from admin",
  });
});

//Todo: Verify captcha
router.post("/verify-recaptcha", async (req, res, next) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "No captcha token provided" });
  }

  const secret_key = authConfig.google_capcha_secret;

  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captchaToken}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("====================================");
      console.log(data);
      console.log("====================================");
      return res.json({ success: true });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Captcha verification failed" });
    }
  } catch (error) {
    next(error);
  }
});

//TODO: Get a specific admin information
router.get("/info/:id", checkAdminLogin, async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "id are required." });
    }
    const admin = await Admin.findById(id);
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
