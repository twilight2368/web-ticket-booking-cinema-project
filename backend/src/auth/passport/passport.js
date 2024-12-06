const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../../models/database/User");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({
        $or: [{ username: username }, { email: username }],
      });
      if (!user) {
        return done(null, false, { message: "Incorrect username or email." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
