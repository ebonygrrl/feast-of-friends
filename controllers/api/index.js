const router = require('express').Router();

// api routes

const userRoutes = require('./user-routes');
router.use('/user', userRoutes);

const eventRoutes = require('./event-routes');
router.use('/event', eventRoutes);

const dishRoutes = require('./dish-routes');
router.use('/dish', dishRoutes);

const comboRoutes = require('./combo-routes');
router.use('/combo', comboRoutes);

module.exports = router;