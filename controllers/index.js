const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
// const dishRoutes = require('./api/dish-routes');
// const eventRoutes = require('./api/event-routes');
// const dashboardRoutes = require('./api/dashboard-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/api/dish', dishRoutes);
// router.use('/api/event', eventRoutes);
// router.use('/api/dashboard', dashboardRoutes);



module.exports = router;