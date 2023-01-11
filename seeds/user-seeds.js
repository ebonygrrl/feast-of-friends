const { User } = require('../models');

const userData = [
  {
    user_firstname: 'Gregg',
    user_lastname: 'Brown',
  },
 
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

