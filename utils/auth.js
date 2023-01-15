// const withAuth = (req, res, next) => {
//   if (!req.session.loggedIn) {
//     return res.redirect('/');
//   }

//   next();
// };

// module.exports = withAuth;

const passport = require('passport');
const { User } = require('../models');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));