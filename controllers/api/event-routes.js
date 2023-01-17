const router = require('express').Router();
const { Combo, Event, User } = require('../../models');
const withAuth = require('../../utils/auth');

//shows the event when user redirected to event page
//need to make sure user is member of this event
router.get('/:id', async (req,res)=>{
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
            include: [Combo,{
                model: User,
                attributes: ['id','firstName','lastName','email','allergy','fdish'],
                }],
        }).then(data=>{
            
            //check
            console.log('line 28 at event-routes ');
            
            const  event= data.get({plain:true});
            const viewEvent= JSON.stringify(data);

            //check
            console.log('line 34 at event-routes ',viewEvent);

            res.render('event',{event,loggedIn: req.session.loggedIn});
            //check
            console.log('line 38 at event-routes');

        });
        
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
router.post('/', (req,res)=>{
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