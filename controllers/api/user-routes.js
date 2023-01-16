const router = require('express').Router();
const { User } = require('../../models/User');

// create new user
router.post('/signup', async (req, res, next) => {
  
  try {
    const dbUserData = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    console.log(dbUserData);

    req.session.save(() => {
        req.session.loggedIn = true;
        //res.redirect('/dashboard');
    });
    next();

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
      // res.status(200)
      // .json({ user: dbUserData, message: 'You are now logged in!' });
      //res.render('dashboard');
    }); 
    
    

  } catch (err) {

    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;