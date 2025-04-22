const Ornithology = require("../models/ornithology"); // ✅ Must match file name and exported model


// GET all expeditions (for Pug view)
exports.ornithology_list = async function(req, res) {
  try {
    const expeditions = await Ornithology.find();
    res.render("ornithology", {
      title: "Search Results - Ornithology ",
      expeditions
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET one expedition by ID (API endpoint - returns JSON)
exports.ornithology_detail = async function(req, res) {
  try {
    const result = await Ornithology.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: `Document for id ${req.params.id} not found` });
  }
};

// POST a new expedition
exports.ornithology_create_post = async function(req, res) {
  const expedition = new Ornithology({
    location: req.body.location,
    species_spotted: req.body.species_spotted,
    duration_days: req.body.duration_days
  });
  try {
    const result = await expedition.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// PUT (update) an ornithology
exports.ornithology_update_put = async function(req, res) {
  try {
    let toUpdate = await Ornithology.findById(req.params.id);
    if (req.body.location) toUpdate.location = req.body.location;
    if (req.body.species_spotted) toUpdate.species_spotted = req.body.species_spotted;
    if (req.body.duration_days) toUpdate.duration_days = req.body.duration_days;
    const result = await toUpdate.save();
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: `${err}: Update failed for id ${req.params.id}` });
  }
};

// DELETE an expedition
exports.ornithology_delete = async function(req, res) {
  try {
    const result = await Ornithology.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: `Error deleting ${err}` });
  }
};

// ✅ GET one expedition by ID and render Pug view
exports.ornithology_view_one_Page = async function(req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    res.render('ornithologydetail', { title: 'Ornithology Detail', toShow: result });
  } catch (err) {
    res.status(500);
    res.send(`{'error': '${err}'}`);
  }
};

// Controller function to render the create page
exports.ornithology_create_Page = function(req, res) {
    console.log("create view");
    try {
      res.render('ornithologycreate', { title: 'Create Ornithology' });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  exports.ornithology_update_Page = async function(req, res) {
    console.log("update view for item " + req.query.id);
    try {
      const result = await Ornithology.findById(req.query.id);
      res.render('ornithologyupdate', { title: 'Update Ornithology', toShow: result });
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };

  exports.ornithology_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id);
    try {
      const result = await Ornithology.findById(req.query.id);
      res.render('ornithologydelete', {
        title: 'Delete ornithology',
        toShow: result
      }); // ✅ CORRECT: ornithologydelete
    } catch (err) {
      res.status(500);
      res.send(`{'error': '${err}'}`);
    }
  };
    
  exports.ornithology_update_Page = async function(req, res) {
    try {
      const result = await Ornithology.findById(req.query.id);
      if (!result) {
        res.status(404).send("No ornithology found for updating.");
        return;
      }
      res.render('ornithologyupdate', { title: 'Update ornithology', toShow: result });
    } catch (err) {
      res.status(500).send(`{'error': '${err}'}`);
    }
  };
  