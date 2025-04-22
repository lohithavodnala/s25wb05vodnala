var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const mongoose = require('mongoose');
const Ornithology = require("./models/ornithology"); // Correct model import

const connectionString = process.env.MONGO_CON;

// Mongoose connection with options
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Setup routes
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

// Database seeding function
async function recreateDB() {
  try {
    await Ornithology.deleteMany();  // Delete everything in the collection

    let instance1 = new Ornithology({
      ornithology_location: "ghost", 
      species_spotted: 'Medium', 
      duration_days: 16
    });
    await instance1.save();

    let instance2 = new Ornithology({
      ornithology_location: "ghost", 
      species_spotted: 'Small', 
      duration_days: 18
    });
    await instance2.save();

    let instance3 = new Ornithology({
      ornithology_location: "Bird", 
      species_spotted: 'Medium', 
      duration_days: 15
    });
    await instance3.save();

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

let reseed = true;
if (reseed) {
  recreateDB();
}

module.exports = app;
