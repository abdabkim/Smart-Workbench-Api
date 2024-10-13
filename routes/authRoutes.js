const express = require('express');

const { registerUser, authenticateUser, deleteAccount, getUser } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();


// Sign Up
router.post('/signup', registerUser);

// Login
router.post('/login', authenticateUser);

router.get('/getuser', authenticate, getUser);

//Delete user account
router.delete('/delete', authenticate, deleteAccount);

module.exports = router;