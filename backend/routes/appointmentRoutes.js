const express = require('express');
const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const Appointment = req.app.get('Appointment');
    const appointments = await Appointment.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const { patientName, age, gender, appointmentDate, dentistId } = req.body;
    const Dentist = req.app.get('Dentist');
    const Appointment = req.app.get('Appointment');

    // Get dentist details
    const dentist = await Dentist.findByPk(dentistId);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }

    const appointment = await Appointment.create({
      patientName,
      age,
      gender,
      appointmentDate,
      dentistId,
      dentistName: dentist.name,
      clinicName: dentist.clinicName
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const Appointment = req.app.get('Appointment');
    const appointment = await Appointment.findByPk(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    await appointment.destroy();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
