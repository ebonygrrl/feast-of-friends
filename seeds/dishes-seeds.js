const { Dishes } = require('../models');

const dishesData = [
  {
    dish_name: 'Poundcake',
  },
 
];

const seedDishes = () => Dishes.bulkCreate(dishesData);

module.exports = seedDishes;
