const sequelize = require('../config/connection');

const seedDishes = require('./dishes-seeds');
const seedEvent = require('./event-seeds');
const seedUser = require('./user-seeds');
const seedCombo = require('./combo-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    console.log('-----USER SEEDED-----');

    await seedEvent();

    console.log('-----EVENT SEEDED-----');

    await seedDishes();
  
    console.log('-----DISH SEEDED-----');

    await seedCombo();
  
    console.log('-----COMBO SEEDED-----');

    process.exit(0);

  };
  
  seedAll();