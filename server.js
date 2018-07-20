const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const db   = require('./config/db');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize(process.env.DATABASE || db.database, process.env.USERNAME || db.username, process.env.PASSWORD || db.password, {
  host: process.env.HOSTURL || db.url,
  dialect: 'postgres',
  ssl: true,
  dialectOptions: {
            ssl: true
        },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }



// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/hello', function(req, res){

  sequelize.query("SELECT loc1_faca, distance, city, state FROM KCBikeFacilities ").then(bikefacilities => {
    res.status(200).send({
      data: bikefacilities,
    })
  })

});

/*
app.route('/*')
  .get((req, res) => {
    res.sendFile('./client/public/index.html'));
  });
  */

// This will be our application entry. We'll setup our server here.
const http = require('http');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);


module.exports = app;
