const { Dish } = require('../models/Dish');
const { uuidValue } = require('./uuid-seeds');

const dishesData = [
  {
    dishname: 'Poundcake',
    preparedby: '1',
    eventid: uuidValue
    //nuts: true
  },
  {
    dishname: 'Chips and Salsa',
    preparedby: '2',
    eventid: uuidValue
    //nuts: false
  },
 
];

const seedDishes = () => Dish.bulkCreate(dishesData);

module.exports = seedDishes;
