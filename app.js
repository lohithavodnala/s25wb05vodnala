const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const Ornithology = require("./models/ornithology");

const connectionString = process.env.MONGO_CON;

// Mongoose connection
mongoose.connect(connectionString)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully!");
    if (reseed) {
      recreateDB();
    }
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// Express app setup
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ornithologyRouter = require('./routes/ornithology');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ornithology', ornithologyRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Database seeding function
async function recreateDB() {
  try {
    await Ornithology.deleteMany(); // Delete all documents

    const seedData = [
      { ornithology_location: "ghost", species_spotted: "Medium", duration_days: 16 },
      { ornithology_location: "ghost", species_spotted: "Small", duration_days: 18 },
      { ornithology_location: "Bird", species_spotted: "Medium", duration_days: 15 }
    ];

    await Ornithology.insertMany(seedData);
    console.log("✅ Database seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
}

const reseed = process.env.NODE_ENV === 'development';  // Only reseed in development mode

module.exports = app;
