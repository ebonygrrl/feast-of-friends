const { Dish } = require('../models/');
const { uuidValue } = require('./uuid-seeds');

const dishesData = [
  {
    dishname: 'Poundcake',
    preparedby: '1',
    eventid: uuidValue
  },
  {
    dishname: 'Chips and Salsa',
    preparedby: '2',
    eventid: uuidValue
  },
 
];

const seedDishes = () => Dish.bulkCreate(dishesData);

module.exports = seedDishes;
