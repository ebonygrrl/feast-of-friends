const router = require('express').Router();
const { Combo } = require('../../models');
const withAuth = require('../../utils/auth');

//add user to event via combo
router.post('/',withAuth,(req,res)=>{
    try{
         //check
        console.log('line 8 at combo-route', req.body);

        //create combo
        Combo.create({
            userID: req.session.userID,
            // dishID may not be necessary
            eventID: req.body.eventCode
        }).then(data=>{

            res.status(200).json(data);

        })

    } catch (err) {
    res.status(400).json(err);
  }
});

//router get all combo
// router.get('/', async (req,res)=>{
//     const comboData= await Combo.findAll().catch((err)=>{
//         res.json(err)
//     });

//     comboView=comboData.get({plain:true});

//     console.log(comboView);

//     res.json(comboData);

// });


module.exports=router;