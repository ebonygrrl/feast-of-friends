const router = require('express').Router();

// required for user login/logout
const userRoutes = require('./user-routes');
router.use('/users', userRoutes);


const eventRoutes = require('./event-routes');
router.use('/event', eventRoutes);

const dishRoutes = require('./dish-routes');
router.use('/dish', dishRoutes);



module.exports = router;

