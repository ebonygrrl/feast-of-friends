const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// create new user
router.post('/signup', async (req, res) => {

    console.log('line 7 user-routes');

    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    }).then(dbUserData =>{
        //get the user logged in after sign up
          req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userID=dbUserData.id;
          req.session.userName=dbUserData.firstName;
          res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });

  // try {
  //   const dbUserData = await User.create({
  //       firstName: req.body.firstName,
  //       lastName: req.body.lastName,
  //       email: req.body.email,
  //       password: req.body.password,
  //   });

  //   req.session.save(() => {
  //       req.session.loggedIn = true;
  //       req.session.userID=dbUserData.id;
  //       req.session.userName=dbUserData.firstName;
  //       //res.redirect('/dashboard');
  //   });
  //   document.location.replace('/api/dashboard')

  // } catch (err) {
  //   console.log(err);
  //   res.redirect('/');
  // }


});

// Login
router.post('/login', async (req, res) => {

  console.log('line 48 user-routes', req.body);
  // try {
    const dbUserData = await User.findOne({ where: { email: req.body.email } }); 

    console.log('line 59 user-routes',dbUserData);


    if(!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    } 

    console.log('line 62 user-routes');

    const validPassword = await dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });  
      return;
    }   
    
    console.log('line 71 user-routes', dbUserData.dataValues.id);
    
    req.session.loggedIn = true;
    req.session.userID=dbUserData.dataValues.id;
    req.session.userName=dbUserData.dataValues.firstName;
    req.session.save();
    // req.session.save(function () {
    //   req.session.loggedIn = true;
    //   req.session.userID=dbUserData.dataValues.id;
    //   req.session.userName=dbUserData.dataValues.firstName;
    // })

    console.log('line 80',req.session);
      console.log('line 79 user-routes',req.session.loggedIn, req.session.userID, req.session.userName);
      res.status(200).json(dbUserData);
 

    

    
    
    // redirect in login.js

  // } catch (err) {

  //   console.log(err);
  //   res.redirect('/');
  // }
});

module.exports = router;