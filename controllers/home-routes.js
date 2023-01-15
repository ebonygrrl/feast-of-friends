const router = require('express').Router();

// only show welcome message on home page
router.get('/', (req, res) => {
    res.render('homepage');
});

// user dashboard 
// router.get('/', withAuth, (req,res)=>{
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     res.render('dashboard', {
//         dashboard,
//         loggedIn: req.session.loggedIn
//     });
//   }
// });

// sign up route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;