const { Dish } = require('../models');
const { uuidValue, uuidValue2 } = require('./uuid-seeds');

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
  {
    dishname: 'Goulash',
    preparedby: '3',
    eventid: uuidValue,
    //nuts: false
    dishtype: "entree",
    dishallergy: "gluten"

  },
  {
    dishname: 'Chips and Salsa',
    preparedby: '2',
    eventid: uuidValue2,
    //nuts: false
    dishtype: "appetizer",
    dishallergy: null
  },
  {
    dishname: 'Goulash',
    preparedby: '3',
    eventid: uuidValue,
    //nuts: false
    dishtype: "entree",
    dishallergy: "gluten"
  },
  {
    dishname: 'Chips and Salsa',
    preparedby: '2',
    eventid: uuidValue2,
    //nuts: false
    dishtype: "appetizer",
    dishallergy: null
  },
  {
    dishname: 'Goulash',
    preparedby: '3',
    eventid: uuidValue2,
    //nuts: false
    dishtype: "entree",
    dishallergy: "egg"
  },
 
];

const seedDishes = () => Dish.bulkCreate(dishesData,  {individualHooks: true});

module.exports = seedDishes;
