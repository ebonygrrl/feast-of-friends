const { User } = require('../models');

const userData = [
  {
    firstname: 'Fiama',
    lastname: 'Gaitan',
    email: 'fiamag92@gmail.com',
    password: 'lovmefat',
    allergy: 'peanut',
    fdish: 'quesadilla'
  },
  {
    firstname: 'Fi',
    lastname: 'Gaitan',
    email: 'fiamag@yahoo.com',
    password: 'lovmefat',
    allergy: 'peanut',
    fdish: 'queso'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

