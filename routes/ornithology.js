const express = require('express');
const router = express.Router();
const ornithology_controller = require('../controllers/ornithologyController');

console.log("TYPE:", typeof ornithology_controller.ornithology_list); // Debug line

router.get('/', ornithology_controller.ornithology_list); // This line must point to a valid function

// Additional routes
router.get('/api/:id', ornithology_controller.ornithology_detail);
router.post('/api', ornithology_controller.ornithology_create_post);
router.put('/api/:id', ornithology_controller.ornithology_update_put);
router.delete('/api/:id', ornithology_controller.ornithology_delete);
router.get('/detail', ornithology_controller.ornithology_view_one_Page);
router.get('/create', ornithology_controller.ornithology_create_Page);
router.get('/update', ornithology_controller.ornithology_update_Page);
router.get('/delete', ornithology_controller.ornithology_delete_Page);

module.exports = router;
