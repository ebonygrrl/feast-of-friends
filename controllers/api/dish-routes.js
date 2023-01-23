const router = require('express').Router();
const { Dish, Combo } = require('../../models');
const withAuth = require('../../utils/auth')

const dishData = require('../../seeds/dishes-seeds');

router.post('/', withAuth, async (req, res) => {
  console.log(req.session)
  console.log(req.body)

  //if (req.session) {
    Dish.create({
      dishname: req.body.dishname,
      //static
      //change preparedby userID
      preparedby: req.session.userID,
      //static
      //change eventid ID to corresponding field/id number this is from a logged in user
      eventid: req.body.eventID,
      dishtype: req.body.dishtype,
      dishallergy: req.body.dishallergy
    })
    .then((dishData) =>{
      console.log('line 59 dish-routes', dishData);

      //update combo on this dish

      const comboUpdate=  Combo.update({
        dishID: dishData.dataValues.id,},
        {
        where: {
          userID: req.session.userID,
          eventID: dishData.dataValues.eventid
        },
      });
      
      res.status(200).json(dishData);
    })
    .catch(err => {
    
      console.log(err);
      res.status(400).json(err);
    });
});

//delete withAuth and id
router.delete('/:id', withAuth, (req, res) => {
  Dish.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dishData => {
    if (!dishData) {
      res.status(404).json({message: 'No dish found with id'});
      return;
    }
    res.json(dishData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;

