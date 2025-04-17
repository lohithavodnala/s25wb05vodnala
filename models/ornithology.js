const mongoose = require("mongoose")
const ornithologySchema = mongoose.Schema({
    ornithology_type: String,
    size: String,
    cost: Number
})
module.exports = mongoose.model("ornithology",
    ornithologySchema)