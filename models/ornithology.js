const mongoose = require("mongoose")
const ornithologySchema = mongoose.Schema({
    ornithology_location: String,
    species_spotted: String,
    duration_days: Number
})
module.exports = mongoose.model("ornithology",
    ornithologySchema)