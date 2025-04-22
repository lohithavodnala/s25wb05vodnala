var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var ornithology_controller = require('../controllers/ornithology');
/// API ROUTE ///
// GET resources base.
var api_controller = require('../controllers/api');
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/ornithology', ornithology_controller.ornithology_create_post);
// DELETE request to delete Costume.
router.delete('/ornithology/:id', ornithology_controller.ornithology_delete);
// PUT request to update Costume.
router.put('/ornithology/:id', ornithology_controller.ornithology_update_put);
// GET request for one Costume.
router.get('/ornithology/:id', ornithology_controller.ornithology_detail);
// GET request for list of all Costume items.
router.get('/ornithology', ornithology_controller.ornithology_list);
module.exports = router;


