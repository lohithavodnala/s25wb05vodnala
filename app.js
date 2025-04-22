var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

// Check if MONGO_CON is set
const connectionString = process.env.MONGO_CON;
if (!connectionString) {
  console.error("MongoDB connection string (MONGO_CON) not set in environment variables.");
  process.exit(1); // Exit the process if the connection string is missing
}

mongoose.connect(connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverSelectionTimeoutMS: 30000 // Timeout set to 30 seconds
})
  .then(() => console.log("Connection to DB succeeded"))
  .catch((err) => console.error("MongoDB connection error:", err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ornithologyRouter = require('./routes/ornithology');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require("./routes/resource");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ornithology', ornithologyRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Seeding the database if needed
async function recreateDB() {
  try {
    // Delete all existing data
    await ornithology.deleteMany();

    // Seed new data
    let instance1 = new ornithology({
      ornithology_location: "ghost", species_spotted: 'Medium', duration_days: 16
    });
    await instance1.save();
    console.log("First object saved");

    let instance2 = new ornithology({
      ornithology_location: "ghost", species_spotted: 'Small', duration_days: 18
    });
    await instance2.save();
    console.log("Second object saved");

    let instance3 = new ornithology({
      ornithology_location: "Bird", species_spotted: 'Medium', duration_days: 15
    });
    await instance3.save();
    console.log("Third object saved");

  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

// Optionally reseed the database if needed
let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
