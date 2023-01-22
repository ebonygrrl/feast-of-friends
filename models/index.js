const User = require('./User');
const Event = require('./Event');
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

//Dish belongs to one Combo
Dish.hasOne(Combo,{
    foreignKey: 'dishID',
    constraints: false,

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

//combo id is linked to one event
Combo.belongsTo(Event,{
    constraints: false,
    foreignKey:'eventID',

});

//combo id is linked to one event
Combo.belongsTo(Dish,{
    constraints: false,
    foreignKey:'dishID',

});

//Event has many combo ids
Event.hasMany(Combo,{
    foreignKey:'eventID'
});

//each Combo id belongs to a user
Combo.belongsTo(User,{
    foreignKey:'userID'
});

//user can have have many combo ID
User.hasMany(Combo,{
    foreignKey:'userID'
});

//each combo entry has one dish
Combo.belongsTo(Dish,{
    constraints: false,
    foreignKey:'dishID',
});



module.exports={User,Event,Dish,Combo};