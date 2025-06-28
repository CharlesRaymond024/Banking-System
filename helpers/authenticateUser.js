const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authenticateUser = async (email, password) => {
  try {
    // Look for user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Authentication successful
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = authenticateUser;
