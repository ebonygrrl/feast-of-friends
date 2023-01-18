const router = require('express').Router();
const { Combo, Event, User, Dish } = require('../../models');
const withAuth = require('../../utils/auth');

//shows the event when user redirected to event page
//need to make sure user is member of this event
router.get('/:id',withAuth, async (req,res)=>{
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
            res.redirect('/api/dashboard')
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

//navigate to create event page
//create potluck route
// router.get('/create',(req, res) => {

//     res.render('create-event');
// });

//create event
router.post('/', withAuth,(req,res)=>{
   try{
    //check
    console.log('line 50 at event-route');

    //create new Event
    Event.create({
        theme: req.body.theme,
        eventDate: req.body.eventDate,
        where: req.body.location,
        organizer: req.session.userID,
        // organizer: 1
    }).then(data=>{
        
        const  event= data.get({plain:true});
        const eventJSON=JSON.stringify(data);
        console.log(data);
        res.render('event',{event,loggedIn: req.session.loggedIn})
       
        // res.render('event',{event,logged_in: req.session.logged_in});
    })
   } catch (err) {
    res.status(400).json(err);
  }
    

})
module.exports = router;