const express = require('express');
const deviceStatus  = require("../controllers/monitoringController");
const router = express.Router();

router.get('/status', deviceStatus);

module.exports = router;