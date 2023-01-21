const { Dish } = require('../models');
const { uuidValue } = require('./uuid-seeds');

const dishesData = [
  {
    dishname: 'Poundcake',
    preparedby: '1',
    eventid: uuidValue,
    //nuts: true
    dishtype: "dessert",
    dishallergy: "eggs"
  },
  {
    dishname: 'Chips and Salsa',
    preparedby: '2',
    eventid: uuidValue,
    //nuts: false
    dishtype: "appetizer",
    dishallergy: "gluten"
  },
 
];

const seedDishes = () => Dish.bulkCreate(dishesData,  {individualHooks: true});

module.exports = seedDishes;
