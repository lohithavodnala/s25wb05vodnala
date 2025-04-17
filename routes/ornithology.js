var express = require('express');
var router = express.Router();

/* GET ornithology expeditions listing. */
router.get('/', function(req, res, next) {
  let ornithology = [
    { location: "Amazon Rainforest", species_spotted: "Harpy Eagle", duration_days: 10 },
    { location: "Himalayan Foothills", species_spotted: "Himalayan Monal", duration_days: 7 },
    { location: "Sundarbans Mangrove", species_spotted: "Masked Finfoot", duration_days: 5 }
  ];
  res.render('ornithology', { title: "Search Results - Ornithology ornithology", ornithology });
});
var express = require('express');
const ornithology_controlers= require('../controllers/ornithology');
var router = express.Router();
/* GET costumes */
router.get('/', ornithology_controlers.ornithology_view_all_Page );

/* GET detail costume page */
router.get('/detail', ornithology_controlers.ornithology_view_one_Page);

/* GET create costume page */
router.get('/create', ornithology_controlers.ornithology_create_Page);

/* GET create update page */
router.get('/update', ornithology_controlers.ornithology_update_Page);

/* GET delete costume page */
router.get('/delete', ornithology_controlers.ornithology_delete_Page);



module.exports = router;