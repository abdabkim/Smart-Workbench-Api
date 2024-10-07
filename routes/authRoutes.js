const express = require('express');

const { registerUser, authenticateUser } = require("../controllers/authController");

const router = express.Router();


// Sign Up
router.post('/signup', registerUser);

// Login
router.post('/login', authenticateUser);

module.exports = router;