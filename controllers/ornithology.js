// controllers/ornithologyController.js

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
    res.status(500).send({ error: err });
  }
};

// GET one expedition by ID (API - JSON)
exports.ornithology_detail = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: `Document for id ${req.params.id} not found` });
  }
};

// POST a new expedition
exports.ornithology_create_post = async function (req, res) {
  const expedition = new Ornithology({
    location: req.body.location,
    species_spotted: req.body.species_spotted,
    duration_days: req.body.duration_days
  });
  try {
    const result = await expedition.save(); // ✅ fixed variable name
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// PUT (update)
exports.ornithology_update_put = async function (req, res) {
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

// DELETE
exports.ornithology_delete = async function (req, res) {
  try {
    const result = await Ornithology.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: `Error deleting ${err}` });
  }
};

// VIEW single expedition (Pug)
exports.ornithology_view_one_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    res.render("ornithologydetail", { title: "Ornithology Detail", toShow: result });
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// VIEW create page
exports.ornithology_create_Page = function (req, res) {
  try {
    res.render("ornithologycreate", { title: "Create Ornithology" });
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// VIEW update page
exports.ornithology_update_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    if (!result) {
      res.status(404).send("No ornithology found for updating.");
      return;
    }
    res.render("ornithologyupdate", { title: "Update Ornithology", toShow: result });
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};

// VIEW delete page
exports.ornithology_delete_Page = async function (req, res) {
  try {
    const result = await Ornithology.findById(req.query.id);
    res.render("ornithologydelete", {
      title: "Delete Ornithology",
      toShow: result
    });
  } catch (err) {
    res.status(500).send(`{'error': '${err}'}`);
  }
};
