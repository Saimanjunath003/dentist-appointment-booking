const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  dentistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dentist',
    required: true
  },
  dentistName: {
    type: String,
    required: true
  },
  clinicName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
