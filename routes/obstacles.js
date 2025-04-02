var express = require('express');
var router = express.Router();

// Define the GET route for /obstacles
router.get('/', function(req, res, next) {
  res.render('obstacles', { title: 'Obstacles' }); // Renders the obstacles.pug file
});

module.exports = router;

