const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
// const dishRoutes = require('./api/dish-routes');
// const eventRoutes = require('./api/event-routes');
// const dashboardRoutes = require('./api/dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/api/dish-routes', dishRoutes);
// router.use('/api/event-routes', eventRoutes);
// router.use('/api/dashboard',dashboardRoutes);

// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h1>")
//   });

module.exports = router;