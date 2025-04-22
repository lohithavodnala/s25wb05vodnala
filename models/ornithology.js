const mongoose = require('mongoose');

const ornithologySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  species_spotted: {
    type: String,
    required: true
  },
  duration_days: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ornithology', ornithologySchema);
