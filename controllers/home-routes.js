const router = require('express').Router();
//const { Home } = require('../controllers/');
const withAuth = require('../utils/auth');
const {Combo,Dish,Event,User}= require('../models');

//HOMEPAGE
// only show welcome message on home page
router.get('/', withAuth, async (req, res) => {
  // If a session exists, redirect the request to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('homepage');
    // res.render('homepage', { loggedIn: req.session.loggedIn });
});

//SIGNUP PAGE
// sign up route
router.get('/signup', (req, res) => {
  res.render('signup');
});

//LOGIN PAGE
// // login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the dashboard
  // if (req.session.loggedIn) {
  //   res.redirect('/dashboard');
  //   return;
  // }

  res.render('login');
});


//CREATE EVENT PAGE
//create potluck route
router.get('/create',withAuth,(req, res) => {

  res.render('create-event');
});

//LOGOUT PAGE
// logout route - WORKS!
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


//EVENT PAGE
//shows the event when user redirected to event page
//need to make sure user is member of this event
router.get('/event/:id',withAuth, async (req,res)=>{
  //get event info from database

  try{
      //get data from database
      const eventData = await Event.findOne({
          where:{id:req.params.id},
          attributes: [
              'id',
              'theme',
              'eventDate',
              'where',
              'organizer',
          ],
          include: [
              Combo,{
              model: User,
              attributes: ['id','firstName','lastName','email','allergy','fdish'],
              }],
      });
      //find dishes committed to the event
      const comboData = await Combo.findAll({
          where: {eventID:req.params.id},
          include: [{
              model:Dish,
              include: User
          }]
      });

      //find number of attendees to event
      const attendance = await Combo.count({
          where: {
              eventID:req.params.id
          },
          // attributes:['userID'],
          // group: ['userID'],
      });

      console.log ('line 44 event-routes',attendance);
      console.log (typeof attendance);

      //if data is empty
      //render dashboard with no Events
      if (eventData.length==0 && comboData.length==0){
          console.log('line 38 event-routes')
          res.redirect('/dashboard')
      }
      //dashboard with event data but no participants
      else if(eventData.length && result2.length==0 ){
          const event = eventData.map(events => events.get({plain: true}));
          res.render('event', {event, loggedIn: req.session.loggedIn, userName: req.session.userName, data:attendance});

      }
      else{
          const event = eventData.get({plain: true});
          const dishes = comboData.map(dish => dish.get({plain: true}));
          const view = JSON.stringify(eventData);
          const view2 = JSON.stringify(comboData);

          //check
          console.log('line 54 at event-routes ', view, view2);

          console.log('line 70 at event-routes', attendance);

          res.render('event',{event,dishes,loggedIn: req.session.loggedIn, userName: req.session.userName,data:attendance});   
      }
      
  }catch (err) {
      res.status(500).json(err);
  }
});


//DASHBOARD PAGE
//route for viewing dashboard and one's own posts
router.get('/dashboard',withAuth, async (req,res)=>{
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

module.exports = router;