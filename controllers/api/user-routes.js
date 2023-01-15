const router = require('express').Router();
const passport = require('passport');
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
            res.status(200).json(dbUserData);
        });

        // Next page
        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/html');
        // res.end('<h1>Hello World</h1>');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login'), passport.authenticate('local'), () => {
  res.send(200);
}
// router.post('/login', async (req, res) => {
  
//   try {
//     const dbUserData = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     const validPassword = dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
//     });
    
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Logout
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;