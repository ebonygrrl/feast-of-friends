const sequelize = require('../config/connection');
const router = require('express').Router();
// const path = require('path');
// only show welcome message on home page
router.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, './public/index.html'))
  res.render('login');
});




// login route
// router.get('/login', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;