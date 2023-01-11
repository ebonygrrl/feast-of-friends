const { Event } = require('../models');

const eventData = [
  {
    theme: 'taco tuesday',
    eventDate: '2023-02-14 09:30:17',
    where: 'office',
    organizer: '1'
  },
];

const seedEvent = () => Event.bulkCreate(eventData);

module.exports = seedEvent;
