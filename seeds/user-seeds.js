const { User } = require('../models');

const userData = [
  {
    firstName: 'Fiama',
    lastName: 'Gaitan',
    email: 'fiamag92@gmail.com',
    password: 'lovmefat',
    allergy: 'Peanuts,Eggs',
    fdish: 'Quesadilla'
  },
  {
    firstName: 'Fi',
    lastName: 'Gaitan',
    email: 'fiamag@yahoo.com',
    password: 'lovmefat',
    allergy: 'Peanuts',
    fdish: 'Queso'
  },
  {
    firstName: 'Sarah',
    lastName: 'Lovato',
    email: 'test@gmail.com',
    password: 'pass1234',
    fdish: 'Goulash'
  },
];

const seedUser = () => User.bulkCreate(userData,{individualHooks:true});

module.exports = seedUser;

