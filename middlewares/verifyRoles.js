const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req?.roles || req?.user?.roles; // Use wherever you're attaching it

    if (!userRole) return res.sendStatus(401); // Unauthorized

    if (!allowedRoles.includes(userRole)) {
      return res.sendStatus(403); // Forbidden
    }

    next();
  };
};

module.exports = verifyRoles;
