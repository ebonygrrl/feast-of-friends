const { User } = require('../models');

const userData = [
  {
    firstName: 'Fiama',
    lastName: 'Gaitan',
    email: 'fiamag92@gmail.com',
    password: 'lovmefat',
    allergy: 'peanuts,eggs',
    fdish: 'quesadilla'
  },
  {
    firstName: 'Fi',
    lastName: 'Gaitan',
    email: 'fiamag@yahoo.com',
    password: 'lovmefat',
    allergy: 'peanuts',
    fdish: 'queso'
  },
];

const seedUser = () => User.bulkCreate(userData,{individualHooks:true});

module.exports = seedUser;

