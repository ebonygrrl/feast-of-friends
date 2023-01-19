const { Combo } = require('../models/');
const { uuidValue, uuidValue2  } = require('./uuid-seeds');

const comboData = [
  {
    userID: '1',
    dishID: '1',
    eventID: uuidValue
  },
  {
    userID: '2',
    dishID: '2',
    eventID: uuidValue
  },
  {
    userID: '1',
    dishID: '1',
    eventID: uuidValue2
  },
  {
    userID: '2',
    dishID: '2',
    eventID: uuidValue2
  },
  {
    userID: '3',
    dishID: '3',
    eventID: uuidValue2
  },
];

const seedCombo = () => Combo.bulkCreate(comboData);

module.exports = seedCombo;
