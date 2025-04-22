const Ornithology = require("../models/ornithology");

// GET all expeditions (Pug view)
exports.ornithology_list = async function (req, res) {
  try {
    const ornithology = await Ornithology.find();
    res.render("ornithology", {
      title: "Search Results - Ornithology",
      ornithology
    });
  } catch (err) {
    console.error("Error fetching ornithology list:", err);
    res.status(500).send({ error: err.message });
  }
};

// GET one expedition by ID (API - JSON)
exports.ornithology_detail = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.params.id);
    if (!result) {
      return res.status(404).send({ error: `Ornithology document not found for ID ${req.params.id}` });
    }
    res.send(result);
  } catch (err) {
    console.error("Error fetching ornithology details:", err);
    res.status(500).send({ error: `Error fetching details for ID ${req.params.id}` });
  }
};

// POST a new expedition
exports.ornithology_create_post = async function (req, res) {
  const expedition = new Ornithology({
    ornithology_location: req.body.location,  // Ensure field name matches the model
    species_spotted: req.body.species_spotted,
    duration_days: req.body.duration_days
  });
  try {
    const result = await expedition.save(); // Save the new expedition
    res.send(result);
  } catch (err) {
    console.error("Error creating ornithology record:", err);
    res.status(500).send({ error: err.message });
  }
};

// PUT (update)
exports.ornithology_update_put = async function (req, res) {
  try {
    const toUpdate = await Ornithology.findById(req.params.id);
    if (!toUpdate) {
      return res.status(404).send({ error: `Ornithology record not found for ID ${req.params.id}` });
    }

    // Update the fields with new data
    if (req.body.location) toUpdate.ornithology_location = req.body.location;
    if (req.body.species_spotted) toUpdate.species_spotted = req.body.species_spotted;
    if (req.body.duration_days) toUpdate.duration_days = req.body.duration_days;

    const result = await toUpdate.save();
    res.send(result);
  } catch (err) {
    console.error("Error updating ornithology record:", err);
    res.status(500).send({ error: `${err}: Update failed for ID ${req.params.id}` });
  }
};

// DELETE
exports.ornithology_delete = async function (req, res) {
  try {
    const result = await Ornithology.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ error: `Ornithology record not found for ID ${req.params.id}` });
    }
    res.send(result);
  } catch (err) {
    console.error("Error deleting ornithology record:", err);
    res.status(500).send({ error: `Error deleting ID ${req.params.id}: ${err.message}` });
  }
};

// VIEW single expedition (Pug)
exports.ornithology_view_one_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    if (!result) {
      return res.status(404).send({ error: `No ornithology found for ID ${req.query.id}` });
    }
    res.render("ornithologydetail", { title: "Ornithology Detail", toShow: result });
  } catch (err) {
    console.error("Error fetching ornithology details:", err);
    res.status(500).send(`{'error': '${err.message}'}`);
  }
};

// VIEW create page
exports.ornithology_create_Page = function (req, res) {
  try {
    res.render("ornithologycreate", { title: "Create Ornithology" });
  } catch (err) {
    console.error("Error rendering create page:", err);
    res.status(500).send(`{'error': '${err.message}'}`);
  }
};

// VIEW update page
exports.ornithology_update_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    if (!result) {
      return res.status(404).send("No ornithology found for updating.");
    }
    res.render("ornithologyupdate", { title: "Update Ornithology", toShow: result });
  } catch (err) {
    console.error("Error fetching ornithology for update:", err);
    res.status(500).send(`{'error': '${err.message}'}`);
  }
};

// VIEW delete page
exports.ornithology_delete_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    if (!result) {
      return res.status(404).send("No ornithology found for deletion.");
    }
    res.render("ornithologydelete", { title: "Delete Ornithology", toShow: result });
  } catch (err) {
    console.error("Error fetching ornithology for deletion:", err);
    res.status(500).send(`{'error': '${err.message}'}`);
  }
};
