const withAuth = (req, res, next) => {
  if (!req.session.loggedIn) {
    return res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;