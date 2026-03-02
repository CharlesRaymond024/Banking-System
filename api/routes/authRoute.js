const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth_view');

// login route
router.post('/login', authController.login);

// export the router
module.exports = router;