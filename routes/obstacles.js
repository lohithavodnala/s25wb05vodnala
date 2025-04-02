var express = require('express');
var router = express.Router();

/* GET Obstacles listing. */
router.get('/obstacles', function(req, res, next) {
  res.render('obstacles', { title: 'Obstacles' });
});

module.exports = router;
