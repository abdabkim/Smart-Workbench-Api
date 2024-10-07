const express = require('express');
const automateActivity = require("../controllers/automationController");

const router = express.Router();

router.post('/schedule', automateActivity);

module.exports = router;