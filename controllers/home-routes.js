const router = require('express').Router();
//const { Home } = require('../controllers/');
const withAuth = require('../utils/auth');

// only show welcome message on home page
router.get('/', async (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

// sign up route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// // login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// logout route - WORKS!
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

//create potluck route
router.get('/create-potluck', (req, res) => {
  res.render('create-potluck');
});

module.exports = router;