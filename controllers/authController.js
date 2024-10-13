const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const registerUser = async (req, res, next) => {
  
  try {
    //Destrucuting data from body
    const { name, email, password } = req.body;

    //Validating that all fields are present
    if (!name || !email || !password) {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User({name,email, password: hashedPassword});

    await createdUser.save();
    
    res.status(201).json({
      token: generateToken(createdUser._id),
      message: `Welcome ${createdUser.name}`});

  } catch (error) {
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
    authenticateUser,
    deleteAccount,
    getUser
}