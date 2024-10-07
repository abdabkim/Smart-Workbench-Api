const express = require('express');
const togglePower = require('../controllers/controllerPanelController');

const router = express.Router();

// You would use a Bluetooth library like `noble` to interact with the smart plug

router.post('/toggle-power', togglePower);

module.exports = router;