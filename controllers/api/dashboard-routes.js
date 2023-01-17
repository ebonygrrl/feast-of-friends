const router = require('express').Router();
const { Event, User, Combo } = require('../../models');
const withAuth = require('../../utils/auth');

//route for viewing dashboard and one's own posts
//in the future to personalize it with user id use session that stores the user_id of user
//1/13 future todo: add withAuth
router.get('/',withAuth, async (req,res)=>{
    try {
        console.log('line 10 at dashboard-routes');
        // console.log('line 12 at dashboard-routes : '+req.session.user_id);
        //get user id from sessions make sure it is stored in the log in
        const user_id = req.session.userID;
        console.log('line 14 at dashboard-routes ',req.session,req.session.userID);
        // const dummyID=1;
        //get data from database of user organized events
        const result=await Event.findAll({
            where:{organizer:user_id},
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
        const result2=await Combo.findAll({
            where:{userID:user_id},
            include: [{
                model: Event,
                include: User
            }]
        });


        //if data is empty
        //render dashboard with no Events
        if (result.length==0 && result2.length==0){
            console.log('line 45 dashboard-routes')
            res.render('dashboard');
        }
        //dashboard with one organized event
        else if(result.length && result2.length==0 ){
            const event1 = result.map(event => event.get({plain: true}));
            res.render('dashboard', {event1, loggedIn: req.session.loggedIn, userName: req.session.userName});

        }
        //dashboard with one participating event
        else if(result.length==0 && result2.length){
            const event2 = result2.map(event => event.get({plain: true}));
            res.render('dashboard', {event2, loggedIn: req.session.loggedIn, userName: req.session.userName});

        }
        else{
            const event1 = result.map(event => event.get({plain: true}));
            const event2 = result2.map(event => event.get({plain: true}));
            const view = JSON.stringify(result);
            const view2 = JSON.stringify(result2);
            //check
            console.log('line 51 at dashboardRoutes ', view, view2);

            //toDo withAut 1/13: 
            // res.render('dashboard', {events, loggedIn: req.session.loggedIn});
            res.render('dashboard', {event1, event2, loggedIn: req.session.loggedIn, userName: req.session.userName});

            res.status(200);
        }
 
   
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