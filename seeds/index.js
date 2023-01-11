const sequelize = require('../config/connection');

const seedDishes = require('./dishes-seeds');
// const seedEvent = require('./event-seeds');
// const seedUser = require('./user-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedDishes();
  
    await seedEvent();

    // await seedUser();
  
    process.exit(0);

  };
  
  seedAll();