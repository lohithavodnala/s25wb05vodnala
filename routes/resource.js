var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var expeditions_controller = require('../controllers/expeditions');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/expeditions', expeditions_controller.expeditions_create_post);
// DELETE request to delete Costume.
router.delete('/expeditions/:id', expeditions_controller.expeditions_delete);
// PUT request to update Costume.
router.put('/expeditions/:id', expeditions_controller.expeditions_update_put);
// GET request for one Costume.
router.get('/expeditions/:id', expeditions_controller.expeditions_detail);
// GET request for list of all Costume items.
router.get('/expeditions', expeditions_controller.expeditions_list);
module.exports = router;


