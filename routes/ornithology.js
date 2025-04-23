const express = require('express');
const router = express.Router();
const ornithology_controllers = require("../controllers/ornithology");

// A little function to check if we have an authorized user and continue on
// or redirect to login
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Debug to ensure function is correctly imported
console.log("TYPE:", typeof ornithology_controllers.ornithology_list); // Should print: function

// MAIN PAGE ROUTE
router.get('/', ornithology_controllers.ornithology_list); // View all items

// API ROUTES (Used for backend CRUD)
router.get('/api/:id', ornithology_controllers.ornithology_detail); // Get one by ID
router.post('/api', ornithology_controllers.ornithology_create_post); // Create new
router.put('/api/:id', ornithology_controllers.ornithology_update_put); // Update existing
router.delete('/api/:id', ornithology_controllers.ornithology_delete); // Delete by ID

// PAGE ROUTES (View pages, not JSON)
router.get('/detail', ornithology_controllers.ornithology_view_one_Page); // Detail View Page
router.get('/create', secured, ornithology_controllers.ornithology_create_Page); // Create View Page
router.get('/update', secured, ornithology_controllers.ornithology_update_Page); // Update View Page
router.get('/delete', secured, ornithology_controllers.ornithology_delete_Page); // Delete View Page

module.exports = router;
