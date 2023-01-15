const router = require('express').Router();
const { User } = require('../../models/User');

// create new user
// router.post('/signup/newuser', withAuth, (req, res) => {
//   console.log(req.user);
//   res.render('dashboard');
// });

router.post('/signup', async (req, res) => {
  
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
        req.session.name = dbUserData.dataValues.email;
        res.redirect('/dashboard');
    });


  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {

  try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } });    

    const validPassword = dbUserData.checkPassword(req.body.password);

    if(!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
    } 
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });  
    }
      
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.name = dbUserData.dataValues.email;
      res.redirect('/dashboard');
    });

    } catch (err) {

      console.log(err);
      res.status(500).json(err);
    }
});

module.exports = router;