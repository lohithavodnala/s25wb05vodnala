var express = require('express');
var router = express.Router();

/* GET ornithology expeditions listing. */
router.get('/', function(req, res, next) {
  let expeditions = [
    { location: "Amazon Rainforest", species_spotted: "Harpy Eagle", duration_days: 10 },
    { location: "Himalayan Foothills", species_spotted: "Himalayan Monal", duration_days: 7 },
    { location: "Sundarbans Mangrove", species_spotted: "Masked Finfoot", duration_days: 5 }
  ];
  res.render('ornithology', { title: "Search Results - Ornithology Expeditions", expeditions });
});

module.exports = router;