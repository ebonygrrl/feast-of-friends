const { User } = require('../models');

const userData = [
  {
    firstName: 'Fiama',
    lastName: 'Gaitan',
    email: 'fiamag92@gmail.com',
    password: 'lovmefat',
    allergy: 'peanut',
    fdish: 'quesadilla'
  },
  {
    firstName: 'Fi',
    lastName: 'Gaitan',
    email: 'fiamag@yahoo.com',
    password: 'lovmefat',
    allergy: 'peanut',
    fdish: 'queso'
  },
];

const seedUser = () => User.bulkCreate(userData,{individualHooks:true});

module.exports = seedUser;

