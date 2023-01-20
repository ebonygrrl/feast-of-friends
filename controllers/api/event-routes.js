const router = require('express').Router();
const {Event} = require('../../models');
const withAuth = require('../../utils/auth');

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
       
    }).then(data=>{
        // const  event= data.get({plain:true});
        res.status(200).json(data);
      })
   } catch (err) {
    res.status(400).json(err);
  }

})

//edit event
router.put('/', withAuth,(req,res)=>{
  try{
   //check
   console.log('line 32 at event-routes');

   //update Event
   Event.update({
       theme: req.body.theme,
       eventDate: req.body.when,
       where: req.body.where,},
       {
       where: {id:req.body.eventID},
   }).then(data=>{
       res.status(200).json(data);
     })
  } catch (err) {
   res.status(400).json(err);
 }

})
module.exports = router;

