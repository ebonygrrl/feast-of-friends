const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// create new user
router.post('/signup', async (req, res) => {

    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    .then(dbUserData => {
      //get the user logged in after sign up
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userID = dbUserData.id;
        req.session.userName = dbUserData.firstName;
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
    });
});

// Login
router.post('/login', async (req, res) => {

    await User.findOne({ 
      where: { email: req.body.email } 
    })
    .then(async dbUserData => {
      console.log(dbUserData);

    if(!dbUserData.email) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    } 

    // const validPassword = dbUserData.checkPassword(req.body.password);
    const validPassword = await dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });  
      return;
    } 
    
    req.session.loggedIn = true;
    req.session.userID=dbUserData.dataValues.id;
    req.session.userName=dbUserData.dataValues.firstName;
    req.session.save();
    
    // req.session.save(() => {
    //   req.session.loggedIn = true;
    //   req.session.userID = dbUserData.dataValues.id;
    //   req.session.userName = dbUserData.dataValues.firstName;
    //   res.json({ user: dbUserData, message: 'You are now logged in!' });
    // });

    // res.send('main', { firstName: req.session.userName });

    // req.session.loggedIn, req.session.userID, req.session.userName);
    res.status(200).json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;