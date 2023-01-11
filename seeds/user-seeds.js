const { User } = require('../models/User');

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
    firstname: 'Fiama',
    lastname: 'Gaitan',
    email: 'fiamag@yahoo.com',
    password: 'lovmefat',
    allergy: 'peanut',
    fdish: 'quesadilla'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

