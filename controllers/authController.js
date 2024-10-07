const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user to database (mock database for now)
    // db.users.push({ fullName, email, password: hashedPassword });
    res.status(201).json({ message: 'User created' });
}


const authenticateUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Get user from database (mocked for now)
    const user = { email, password: 'hashedPasswordFromDB' };
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }

module.exports = {
    registerUser,
    authenticateUser
}