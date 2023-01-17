const router = require('express').Router();
const { User } = require('../../models');

// create new user
router.post('/signup', async (req, res) => {
  
  try {
    const dbUserData = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userID=dbUserData.id;
        req.session.userName=dbUserData.firstName;
        //res.redirect('/dashboard');
    });
    document.location.replace('/api/dashboard')

  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
});

// Login
router.post('/login', async (req, res) => {

  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });   

    if(!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    } 

    const validPassword = dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });  
      return;
    }   
    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.loggedIn = true;
      req.session.userID=dbUserData.id;
      req.session.userName=dbUserData.firstName;
  
    }); 

    res.status(200).json(dbUserData);
    
    // redirect in login.js

  } catch (err) {

    console.log(err);
    res.redirect('/');
  }
});

module.exports = router;