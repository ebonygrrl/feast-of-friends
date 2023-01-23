const router = require('express').Router();
const { Combo, Dish } = require('../../models');
const withAuth = require('../../utils/auth');



//add user to event via combo
router.post('/',withAuth,async (req,res)=>{
    try{
         //check
        console.log('line 9 at combo-route', req.body);

        //first find if the combo already exist
        const rsvp=await Combo.findOne({
            where: {
                userID: req.session.userID,
                eventID: req.body.eventCode
            }
        });

        console.log('line 19 at combo-route', rsvp);

        //if rsvp exist alert user that user already rsvped
        if (rsvp){
            res.status('401').send({error:`${req.session.userName}, you already RSVPed to this event.`});
        
        } else { //create rsvp through combo

                    //create combo
            Combo.create({
                userID: req.session.userID,
                // dishID may not be necessary
                eventID: req.body.eventCode
            }).then(data=>{

                res.status(200).json(data);

        });

        };


    } catch (err) {

        res.status(400).json(err);
  }
});

//leave potluck by deleting combo 
router.delete('/',withAuth,(req,res)=>{

    //check
    console.log('line 51 combo-routes.js', req.body.potluck_ID);
    
    Combo.destroy({
      where:{
        userID: req.session.userID,
        eventID: req.body.potluckID
      }
    }).then(deletedRSVP=>{
  
      //check if deleted
      if(!deletedRSVP){
        res.status(404).json({message: 'No rsvp record found.'});
        return;
      }
      //check
      console.log('line 66 combo-routes.js', deletedRSVP);
  
      res.json(deletedRSVP);
    }).catch (err=>{
      res.status(500).json(err);
    });
  });

  //remove dish from potluck
router.put('/:id', withAuth, async (req,res)=>{
  try{

    Combo.update({
      dishID: null,
    },{
    where: {
      userID:req.session.userID,
      eventID: req.params.id
    }}).then((delDish)=>
    console.log('line 87 combo-routes', delDish));
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const deleteDish = Dish.destroy({
      where:{
        preparedby: req.session.userID,
        eventid: req.params.id
      }
    }).then(deletedDish=>{
      if (!deletedDish){
        res.status(404).json({message: 'No dish found.'});
        return;
      };
      db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      res.json(deleteDish);
    })

  } catch (err) {
    res.status(500).json(err);
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