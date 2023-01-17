const router = require('express').Router();
const { Event, User, Combo } = require('../../models');
const withAuth = require('../../utils/auth');

//route for viewing dashboard and one's own posts
//in the future to personalize it with user id use session that stores the user_id of user
//1/13 future todo: add withAuth
router.get('/', async (req,res)=>{
    try {
        console.log('line 10 at dashboard-routes');
        // console.log('line 12 at dashboard-routes : '+req.session.user_id);
        //get user id from sessions make sure it is stored in the log in
        const userID = req.session.userID;
        console.log('line 14 at dashboard-routes ',req.session.userID);
        // const dummyID=1;
        //get data from database of user organized events
        const result=await Event.findAll({
            where:{organizer:userID},
            attributes: [
                'id',
                'theme',
                'eventDate',
                'where',
                'organizer'
            ],
            include: User,
        });
        //find data of events where user is part of
        // const result=await Event.findAll({
        //     through:{model:Combo,
        //         organizer:userID},
        //     attributes: [
        //         'id',
        //         'theme',
        //         'eventDate',
        //         'where',
        //         'organizer'
        //     ],
        //     include: User,
        // });

        //if data is empty
        //render dashboard with no Events
        if (result.length==0){
            console.log('line 32 dashboard-routes')
            res.render('dashboard');
        } else{
            const events = result.map(event => event.get({plain: true}));
            const view = JSON.stringify(result);
            //check
            console.log('line 38 at dashboardRoutes ', view);

            //toDo withAut 1/13: 
            // res.render('dashboard', {events, loggedIn: req.session.loggedIn});
            res.render('dashboard', {events});

            res.status(200);
        }
        
            // if data is empty
            // render dashboard with no Events
            // if(data===undefined || data.length==0 || !data){

            //     console.log('line 33 dashboard-routes')
            //     res.render('dashboard');
            // }
        
            // console.log('line 37 at dashboard-routes ',req.session.user_id);
            
            // const events = data.map(event => event.get({plain: true}));
            // const view = JSON.stringify(data);
            // //check
            // console.log('line 42 at dashboardRoutes ', view);

            // //toDo withAut 1/13: 
            // res.render('dashboard', {events, loggedIn: req.session.loggedIn});
            // //res.render('dashboard', {events});

            // res.status(200);
        // });       
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