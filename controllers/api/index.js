const router = require('express').Router();

// api routes

const userRoutes = require('./user-routes');
router.use('/users', userRoutes);

const dashboardRoutes = require('./dashboard-routes');
router.use('/dashboard', dashboardRoutes);

const eventRoutes = require('./event-routes');
router.use('/event', eventRoutes);

const dishRoutes = require('./dish-routes');
router.use('/dish', dishRoutes);

module.exports = router;