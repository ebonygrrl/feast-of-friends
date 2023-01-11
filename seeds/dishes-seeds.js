const { Dish } = require('../models/Dish');

const dishesData = [
  {
    dishname: 'Poundcake',
    preparedby: '1',
    eventid: '1'
  },
  {
    dishname: 'Poundcake',
    preparedby: '2',
    eventid: '1'
  },
 
];

const seedDishes = () => Dish.bulkCreate(dishesData);

module.exports = seedDishes;
