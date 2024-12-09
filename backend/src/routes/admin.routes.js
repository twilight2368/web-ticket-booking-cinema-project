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

router.post("/verify-recaptcha", async (req, res, next) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "No captcha token provided" });
  }

  const secret_key = authConfig.google_capcha_secret;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${captchaToken}`
    );

    if (response.data.success) {
      console.log("====================================");
      console.log(response.data);
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
