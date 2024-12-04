const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(function (username, password, cb) {}));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  //   User.findById(id, function (err, user) {
  //     if (err) {
  //       return cb(err);
  //     }
  //     cb(null, user);
  //   });
});
