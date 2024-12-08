const express = require("express");
const router = express.Router();
//todo: ----------------------- ADMIN ROUTES --------------------------------------
router.get("/", (req, res, next) => {
  return res.json({
    message: "Hello from admin",
  });
});

router.post("/verify-recaptcha", async (req, res) => {
  const { captchaToken } = req.body;

  if (!captchaToken) {
    return res
      .status(400)
      .json({ success: false, message: "No captcha token provided" });
  }

  const secret_key = process.env.SECRET_KEY_RECAPTCHA_GG;

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
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
