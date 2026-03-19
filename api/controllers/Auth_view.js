const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authenticateUser = require("../helpers/authenticateUser");
const generateToken = require("../helpers/generateToken");
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser(email, password);

    // Generate tokens
    const { token, refreshToken } = generateToken(user);

    // Set refresh token in cookie (optional)
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        bank: user.bank,
        roles: user.roles,
      },
      accessToken: token,
      refreshToken: refreshToken
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.refresh = async (req, res) => {  // ← make it async
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "No refresh token" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {       // ← make callback async
      if (err) return res.status(403).json({ message: "Invalid token" });

      // Fetch full user from DB instead of relying on token payload
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) return res.status(403).json({ message: "User not found" });

      const accessToken = jwt.sign(
        { id: user.id, roles: user.roles },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          bank: user.bank,
          roles: user.roles,        // ← full user data, same shape as login
        },
      });
    }
  );
};

exports.logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // No content, already logged out

    // Clear the refresh token cookie
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged out successfully" });
};
