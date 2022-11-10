const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require("chalk");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const app = express(); // accept express
require('dotenv').config();

// get static view directory
const viewPath = path.join(__dirname, '../public/templates/views');
const partialsPath = path.join(__dirname, '../public/templates/partial');

// setup handle bars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.json());
app.use(cookieParser());
hbs.registerPartials(partialsPath);
// setup static directory
app.use(express.static(path.join(__dirname, '../public')));

// set port
const port = normalizePort(process.env.PORT || '3000');

hbs.registerHelper('isLearner', function (role){
  return role === "learner"
})
hbs.registerHelper('isIssuer', function (role){
  return role === "issuer"
})
hbs.registerHelper('isVerifier', function (role){
  return role === "verifier"
})

// session middleware
app.use(session({
  secret: 'algorand-education',
  resave: true,
  saveUninitialized: false,
}));

// enabling CORS for all requests
app.use(bodyParser.json());
app.use(cors());

// require middleware
app.listen(port, () => {
  console.log(chalk.green('Server is up on port ' + port));
  // setup routers for view and action
  require('./routes/view.js')(app);
  require('./routes/api.js')(app);
});
// eslint-disable-next-line require-jsdoc
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
