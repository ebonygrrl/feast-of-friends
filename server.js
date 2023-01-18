// app modules
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// routes / database
const routes = require('./controllers');

// // import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const expiryDate = new Date(Date.now + 60 * 60 * 100)

const sess = {
  secret: '6iNIbx$t2i}n[{B)1.|W',
  cookie: { 
    secure: false,
    expires: expiryDate,
    maxAge: 36000000,
    httpOnly: false 
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// format time for handlebars
const helpers = require('./utils/helpers'); 

// get handlebars
const hbs = exphbs.create({ helpers }); // { helpers }
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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