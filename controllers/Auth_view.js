const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authenticateUser = require('../helpers/authenticateUser');
const generateToken = require('../helpers/generateToken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    // Generate tokens
    const { token, refreshToken } = generateToken(user);

    // Set refresh token in cookie (optional)
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        bank: user.bank,
        roles: user.roles
      },
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};