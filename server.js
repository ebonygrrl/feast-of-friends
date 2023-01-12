// app modules
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// // const session = require('express-session');
// // const SequelizeStore = require('connect-session-sequelize')(session.Store);

// routes / database
const routes = require('./controllers');

// // import sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

// session info here //

// format time for handlebars
//const helpers = require('./utils/helpers'); 

// get handlebars
const hbs = exphbs.create({}); // { helpers }
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// points to public/index.html
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

// // HEROKU DEPLOYMENT SAMPLE

// // const http = require('http');
// // const port = process.env.PORT || 3000;

// // const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/html');
// //   res.end('<h1>Hello World</h1>');
// // });

// // server.listen(port,() => {
// //   console.log(`Server running at port `+ port);
// // });
