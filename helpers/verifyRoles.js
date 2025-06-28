const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req?.user?.role;

    if (!userRole) return res.sendStatus(401); // Unauthorized

    if (!allowedRoles.includes(userRole)) return res.sendStatus(403); // Forbidden

    next();
  };
};

module.exports = verifyRoles;
