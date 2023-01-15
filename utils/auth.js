const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;