var ornithology = require('../models/ornithology');
// List of all expeditions
// exports.expeditions_list = function(req, res) {
// res.send('NOT IMPLEMENTED: expeditions list');
// };

// List of all expeditions
exports.ornithology_list = async function (req, res) {
    try {
        theornithology = await ornithology.find();
        res.send(theornithology);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific expeditions.
//exports.expeditions_detail = function (req, res) {
//res.send('NOT IMPLEMENTED: expeditions detail: ' + req.params.id);
//};
// Handle expeditions create on POST.
//exports.expeditions_create_post = function (req, res) {
//  res.send('NOT IMPLEMENTED: expeditions create POST');
//};
// Handle expeditions create on POST.
exports.ornithology_create_post = async function (req, res) {
    console.log(req.body)
    let document = new ornithology();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"expeditions_type":"goat", "cost":12, "size":"large"}
    document.ornithology_type = req.body.ornithology_type;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle expeditions delete on DELETE.
exports.ornithology_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await expeditions.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle expeditions update form on PUT.
// exports.expeditions_update_put = function (req, res) {
//     res.send('NOT IMPLEMENTED: expeditions update PUT' + req.params.id);
// };

// Handle expeditions update form on PUT.
exports.ornithology_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await ornithology.findById(req.params.id)
        // Do updates of properties
        if (req.body.ornithology_location)
            toUpdate.ornithology_location = req.body.ornithology_location;
        if (req.body.species_spotted) toUpdate.species_spotted = req.body.species_spotted;
        if (req.body.duration_days) toUpdate.duration_days = req.body.duration_days;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};

// VIEWS
// Handle a show all view
exports.ornithology_view_all_Page = async function (req, res) {
    try {
        theornithology = await ornithology.find();
        res.render('ornithology', { title: 'ornithology Search Results', results: theornithology });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific expeditions.
exports.ornithology_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await ornithology.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle a show one view with id specified by query
exports.ornithology_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await ornithology.findById(req.query.id)
        res.render('ornithologydetail',
            { title: 'ornithology Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a expeditions.
// No body, no in path parameter, no query.
// Does not need to be async
exports.ornithology_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('ornithologycreate', { title: 'ornithology Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a expeditions.
// query provides the id
exports.ornithology_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await ornithology.findById(req.query.id)
        res.render('ornithologyupdate', { title: 'ornithology Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.ornithology_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await ornithology.findById(req.query.id)
    res.render('ornithologydelete', { title: 'ornithology Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };