const express = require('express');
const router = express.Router();

// Get all dentists
router.get('/', async (req, res) => {
  try {
    const Dentist = req.app.get('Dentist');
    const dentists = await Dentist.findAll();
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single dentist
router.get('/:id', async (req, res) => {
  try {
    const Dentist = req.app.get('Dentist');
    const dentist = await Dentist.findByPk(req.params.id);
    if (!dentist) {
      return res.status(404).json({ message: 'Dentist not found' });
    }
    res.json(dentist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
