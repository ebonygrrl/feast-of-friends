const router = require('express').Router();
const withAuth = require('../utils/auth');
const Event = require('../models/Event');

// only show welcome message on home page
router.get('/', (req, res) => {
    res.render('homepage');
});

// user dashboard 
router.get('/dashboard', withAuth, async (req,res)=>{
  const allEvents = await Event.findAll().catch(err => {
    res.json(err);
  })

  const dashEvent = allEvents.map(events => events.get({ plain: true }));

  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    res.render('dashboard', {
      dashEvent,
      loggedIn: req.session.loggedIn
    });
  }
});

// sign up route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// login route
router.get('/login', (req, res) => {
  res.render('login');
});

// logout route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;