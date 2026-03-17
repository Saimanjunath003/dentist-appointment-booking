const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
});

module.exports = mongoose.model('Dentist', dentistSchema);
