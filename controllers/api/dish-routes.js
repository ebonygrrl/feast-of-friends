const router = require('express').Router();
const { Dish } = require('../../models');

//const sequelize = require('../config/connection');
//const Dish = require('../../models/Dish');

const dishData = require('../../seeds/dishes-seeds');


//HOME ROUTES SHOULD BE THE ONLY ONE RENDERING
//res.render - RESERVED FOR HOME ROUTES ONLY
//API ROUTES ARE ONLY INTERFACING THROUGH DATA


// get all dishes
// router.get('/dish', async (req, res) => {
//     ('all', { Dish });
//   });
  
//route to get all dishes
router.get('/', async (req, res) => {
  console.log(Dish, "err here");
    //const dishData = await Dish.findAll().catch((err) => { 
    const dishesData = await Dish.findAll().catch((err) => { 
      console.log(dishesData, "looking for dD");
        res.json(err);
      });
        const dishe = dishesData.map((dishe) => dishe.get({ plain: true }));
        console.log("looking for dishe", dishe);
        res.render('dish', { dishe });
      });

  // get one dish
  // router.get('/dish/:num', async (req, res) => {
  //   return res.render('dish', Dish[req.params.num - 1]);
  // });
  
// route to get one dish
// router.get('/dish/:id', async (req, res) => {
//     try{ 
//         const disheData = await Dish.findByPk(req.params.id);
//         if(!disheData) {
//             res.status(404).json({message: 'No dish with this id!'});
//             return;
//         }
//         const dish = dishData.get({ plain: true });
//         res.render('dish', dish);
//       } catch (err) {
//           res.status(500).json(err);
//       };     
//   });
  
//--------------------------------------------------------------------------------//
// get one dish without serializing data
// router.get('/dish/:id', async (req, res) => {
//     try {
//       const dishData = await Dish.findByPk(req.params.id);
//       console.log(dishData)
//       res.render('dish', dishData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
  // // get one dish with serialized data
  // router.get('/dish/:id', async (req, res) => {
  //   try {
  //   // Search the database for a dish with an id that matches params
  //   const dishData = await Dish.findByPk(req.params.id);
  //   console.log(dishData)
  //   // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  //   const dish = dishData.get({ plain: true });
  //   // Then, the 'dish' template is rendered and dish is passed into the template.
  //   res.render('dish', dish);
  //   } catch (err) {
  //       res.status(500).json(err);
  //   }
  // });
 
  //------------------------------------------------------------------------------------//

  // route to create/add a dish using async/await
// router.post('/', async (req, res) => {
//     try { 
//       const dishesData = await Dish.create({
//       dishname: req.body.dishname,
//       preparedby: req.body.preparedby,
//       eventid: req.body.eventid,
//       //nuts: req.body.nuts,
//     });
//     // if the dish is successfully created, the new response will be returned as json
//     res.status(200).json(dishesData)
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   });


module.exports = router;

