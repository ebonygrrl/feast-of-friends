const router = require('express').Router();
const multer = require('multer');
const path = require("path");
const { User } = require('../../models');

const storage = multer.diskStorage({
  destination: 'user/upload',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
          req.fileValidationError = 'Only image files are allowed!';
          return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
  },
}).single('avatar');

// create new user
router.post('/signup', upload, async (req, res) => {
  console.log(req.body);

    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      allergy: req.body.allergy,
      fdish: req.body.fdish,
      avatar: req.file.filename
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

    const validPassword = dbUserData.checkPassword(req.body.password);
    
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });  
      return;
    } 
    
    req.session.loggedIn = true;
    req.session.userID=dbUserData.dataValues.id;
    req.session.userName=dbUserData.dataValues.firstName;
    req.session.save();
    
    res.status(200).json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;