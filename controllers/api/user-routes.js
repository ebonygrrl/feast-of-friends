const router = require('express').Router();

const { User } = require('../../models');


// CREATE new user
router.post('/', async (req, res) => {
    // dbUserData = `User sign up route activated. 
    // ${req.body.email} ${req.body.password}`;

    // console.log(dbUserData);
    // res.status(200).json(dbUserData);
    console.log(req.body);
    try {
        const dbUserData = await User.create({
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        // req.session.save(() => {
        //     req.session.loggedIn = true;

        //     res.status(200).json(dbUserData);
        // });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

// // Login
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

//     const validPassword = await dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.loggedIn = true;

//       res
//         .status(200)
//         .json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

//route to dashboard



module.exports = router;