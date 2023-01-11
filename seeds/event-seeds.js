const { Event } = require('../models/');
const {uuidValue, uuidValue2 }= require('./uuid-seeds');

const eventData = [
  {
    id: uuidValue,
    theme: 'taco tuesday',
    eventDate: '2023-02-14 09:30:17',
    where: 'office',
    organizer: '1'
  },
  {
    id: uuidValue2,
    theme: 'asian',
    eventDate: '2023-02-19 10:30:17',
    where: 'backyard gazebo',
    organizer: '2'
  },
];

const seedEvent = () => Event.bulkCreate(eventData);

module.exports = seedEvent;
