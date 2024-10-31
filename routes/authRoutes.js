const express = require('express');
const multer = require("multer");
const fs = require("fs/promises");

const { registerUser, verifyUser, authenticateUser, deleteAccount, getUser, updatePassword } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {

        const timestamp = Date.now();

        const savedDirectory = `uploads/${req.body.name.replace(" ", "_")}_${timestamp}`;

        await fs.mkdir(savedDirectory, {recursive: true});
            
        cb(null, savedDirectory); 

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    const allowedImagesTypes = /jpeg|jpg|png/;
    const isImage = allowedImagesTypes.test(file.mimetype);

    if (isImage) {
        return cb(null, true);
    }

    cb(new Error("Wrong file format"));
} 

const upload = multer({storage: storage, fileFilter: fileFilter});

// Sign Up
router.post('/signup', upload.single("photo"), registerUser);

//Verify user
router.get('/verify/:token', verifyUser);

// Login
router.post('/login', authenticateUser);

router.get('/getuser', authenticate, getUser);

//Delete user account
router.delete('/delete', authenticate, deleteAccount);

router.put('/updatepassword', authenticate, updatePassword);

module.exports = router;