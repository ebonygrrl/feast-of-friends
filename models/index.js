const User = require('./User');
const Event = require('./event');
const Dish = require('./Dish');
const Combo = require('./Combo');


//event belongs to one organizer
Event.belongsTo(User,{
    foreignKey: 'organizer',
});

//Dish brought by a user
Dish.belongsTo(User,{
    foreignKey: 'preparedby'
});

//Dish belongs to Event
Dish.belongsTo(Event,{
    foreignKey: 'preparedby'
});

//defining Combo table
//Event has many contributors
User.belongsToMany(Event,{
    as: 'contributor',
    through:{model: Combo, unique:false},
    foreignKey: 'userID'
});


//Event has many attendees
Event.belongsToMany(User,{
    as: 'potluck',
    through:{model: Combo, unique:false},
    foreignKey: 'eventID'
    
});

//Event has many dishes
Event.hasMany(Dish,{
    foreignKey:'eventid'
});


module.exports={User,Event,Dish,Combo};