const router = require('express').Router();
const { Dish, Event, User, Combo } = require('../../models');
const withAuth = require('../../utils/auth');

//add user to event via combo
router.post('/',(req,res)=>{
    try{
         //check
        console.log('line 8 at combo-route');

        //create combo
        Combo.create({
            userID: req.session.userID,
            // dishID may not be necessary
            eventID: req.body.eventCode
        }).then(data=>{
            const combo=data.get({plain:true});
            console.log(combo);
            res.redirect('/api/dashboard');

        })

    } catch (err) {
    res.status(400).json(err);
  }
})

module.exports=router;