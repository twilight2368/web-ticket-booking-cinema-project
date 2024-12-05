function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    //todo: Handle authentication failure (e.g., redirect to login page)
    res.status(401).json({ message: "Unauthorized" });
  }
}

function checkCookie(req, res, next) {
  console.log(cliColor.red("Cookies:"), req.cookies); // Access parsed cookies
  // Or
  console.log(cliColor.red("Raw Cookies:"), req.headers.cookie); // Access raw cookie header

  next();
}
