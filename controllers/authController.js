const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const crypto = require("crypto");
const mail = require("../config/emailConfig");



const registerUser = async (req, res, next) => {
  
  try {
    //Destrucuting data from body
    const { name, email, password, profession } = req.body;

    //Validating that all fields are present
    if (!name || !email || !password || !profession) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    //Ensuring that password length isnt less than 8
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password should be greater than or equal to 8");
    }

    const user = await User.findOne({email: email});

    if (user) {
      res.status(302);
      throw new Error("User with that email already exists");
    }


    //Verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //Saving user
    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUrl = `${req.protocol}://${req.hostname}:${process.env.PORT}/${req.file.destination}/${req.file.filename}`;

    //res.json({message: req.file});
    const createdUser = new User({name,email, profession, photo_url: imageUrl, password: hashedPassword, verificationToken: verificationToken});

    await createdUser.save();

    const verificationUrl = `http://localhost:${process.env.PORT}/auth/verify/${verificationToken}`;
    
    
    await mail.sendMail({
      to: email,
      subject: "Verify your email",
      text: `Click this link to verify your email: ${verificationUrl}`
    });
    
    res.status(200).json({
      message: `Verification email sent`
    });

  } catch (error) {
      next(error.message);
  }
}

const verifyUser = async (req,res) => {

  try {

    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("Invalid token");
    }

    if (user.isVerified == true) {
      return res.send("Email already verified");
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();
    res.send("Email verified successfully");

  }  catch (error) {
    next(error.message);
  }
}

const authenticateUser = async (req, res, next) => {
    
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }

    const user = await User.findOne({email});

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(404);
      throw new Error("Incorrect credentials");
    }

    if (user.isVerified != true) {
      res.status(400);
      throw new Error("Please verify email");
    }

    res.status(200).json({id: generateToken(user._id), message: `Welcome ${user.name}`});

  } catch(error) {
    next(error.message);
  }
}

const getUser = async (req, res, next) => {
  
  try {

    const user = await User.findById(req.id);

    if (!user) {
      res.status(404);
      throw new Error("Not found");
    }

    res.status(200).json({name: user.name, email: user.email, token: req.id});

  } catch (error) {
    next(error.message)
  }
}

const updatePassword = async (req, res, next) => {

  try {
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.id);

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      res.status(400);
      throw new Error("Old password doesn't match");
    }

    if (newPassword.length < 8) {
      res.status(400);
      throw new Error("New password length is too short");
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({message: "Password updated successfully"});

  } catch(error) {
    next(error.message);
  }
}

//Delete user account
const deleteAccount = async (req,res,next) => {
  
  try {
    await User.findByIdAndDelete(req.id);

    res.status(200).json({message: "Account deleted"});

  } catch(error) {
    next(error.message);
  }
}

const generateToken = (id) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET_TOKEN);
  return token;
}


module.exports = {
    registerUser,
    updatePassword,
    verifyUser,
    authenticateUser,
    deleteAccount,
    getUser
}