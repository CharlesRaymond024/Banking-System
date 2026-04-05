const { v4: uuidv4 } = require("uuid");

const generateTransactionReference = () => {
  return `TXN-${uuidv4().replace(/-/g, "").slice(0, 16)}`;
};

module.exports = generateTransactionReference;