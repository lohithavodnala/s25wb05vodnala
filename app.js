const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const mongoose = require('mongoose');
const Account = require('./models/account');
const Ornithology = require('./models/ornithology');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const ornithologyRouter = require('./routes/ornithology');
const gridRouter = require('./routes/grid');
const pickRouter = require('./routes/pick');
const resourceRouter = require('./routes/resource');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ornithology', ornithologyRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// Catch 404 and error handler
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).render('error');
});

// MongoDB connection
const connectionString = process.env.MONGO_CON;
const reseed = process.env.NODE_ENV === 'development';

async function recreateDB() {
  await Ornithology.deleteMany();
  await Ornithology.insertMany([
    { ornithology_location: 'ghost', species_spotted: 'Medium', duration_days: 16 },
    { ornithology_location: 'ghost', species_spotted: 'Small', duration_days: 18 },
    { ornithology_location: 'Bird', species_spotted: 'Medium', duration_days: 15 }
  ]);
  console.log('✅ Database seeded successfully.');
}

mongoose.connect(connectionString)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
    if (reseed) await recreateDB();
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

module.exports = app;
