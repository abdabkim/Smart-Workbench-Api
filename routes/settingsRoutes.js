const express = require('express');
const updateSettings = require('../controllers/settingsController');

const router = express.Router();

router.put('/update-profile', updateSettings);

module.exports = router;