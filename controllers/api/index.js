const router = require('express').Router();


// required for user login/logout
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

module.exports = router;