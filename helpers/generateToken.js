const jwt = require('jsonwebtoken');
require('dotenv').config();

const genAuthToken = (user) => {
  return jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const genRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, roles: user.roles },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

const generateToken = (user) => {
  const token = genAuthToken(user);
  const refreshToken = genRefreshToken(user);
  return { token, refreshToken };
};

module.exports = generateToken;
