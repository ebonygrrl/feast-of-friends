// app modules
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers1 = require('handlebars-helpers')();
// const printJS=require('print-js');

// routes / database
const routes = require('./controllers');

// // import sequelize connection
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

const expiryDate = new Date(Date.now + 60 * 60 * 100);

const sess = {
  secret: '6iNIbx$t2i}n[{B)1.|W',
  cookie: { 
    secure: false,
    expires: expiryDate,
    maxAge: 36000000,
    httpOnly: false 
  },
  resave: true,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// get handlebars
// create custom helpers
const hbs = exphbs.create({
  /*config*/ 
  extname:"handlebars", 
  helpers: { equal:function(a,b, options){return (a==b)?options.fn(this):options.inverse(this)} }
}); 

// location for partials
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// register new handlebar function
//hbs.handlebars.registerHelper('whichPartial', function(context, options) { return 'dynamicPartial' });

// express data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// points to public/index.html
app.use(express.static(path.join(__dirname, 'public')));

// controllers
// app.use(routes);
app.use(require('./controllers'));

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});