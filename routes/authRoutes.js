const express = require('express');

const { registerUser, authenticateUser, deleteAccount } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();


// Sign Up
router.post('/signup', registerUser);

// Login
router.post('/login', authenticateUser);

//Delete user account
router.delete('/delete', authenticate, deleteAccount);

module.exports = router;