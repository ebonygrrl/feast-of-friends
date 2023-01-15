const sequelize = require('../../config/connection');
const router = require('express').Router();
const { Event, User, Combo } = require('../../models');
const withAuth = require('../../utils/auth');
var helpers = require('handlebars-helpers')();

//route for viewing dashboard and one's own posts
//in the future to personalize it with user id use session that stores the user_id of user
//1/13 future todo: add withAuth
router.get('/', withAuth, async (req,res)=>{
    try {
        console.log('line 12 at dashboard-routes');
        // console.log('line 12 at dashboard-routes : '+req.session.user_id);
        //get user id from sessions make sure it is stored in the log in
        const userID = req.session.user_id;
        // const dummyID=1;
        //get data from database
        await Event.findAll({
            where:{organizer:1},
            attributes: [
                'id',
                'theme',
                'eventDate',
                'where',
                'organizer'
            ],
            include: User,
        }).then(data => {
        
            console.log('line 31 at dashboard-routes ');
            
            const events = data.map(event => event.get({plain: true}));
            const view = JSON.stringify(data);
            //check
            console.log('line 36 at dashboardRoutes ', view);

            //toDo withAut 1/13: 
            res.render('dashboard', {events, loggedIn: req.session.loggedIn});
            //res.render('dashboard', {events});

            res.status(200);
        });       
    } catch (err) {
        res.status(500).json(err);
    }

});

// router.get('*', withAuth, async (req,res) => {
//     res.render('homepage', {
//         dashboard,
//         loggedIn: req.session.loggedIn
//     });
// });

module.exports = router;