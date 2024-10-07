const updateSettings = async (req, res) => {
    const { email, fullName } = req.body;
  
    // Logic to update user profile in the database
  
    res.json({ message: 'Profile updated' });
}

module.exports = updateSettings;