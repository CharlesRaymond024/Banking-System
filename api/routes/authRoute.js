const express = require('express');
const router = express.Router();
const authController = require('../controllers/Auth_view');

// login route
router.post('/login', authController.login);
router.get('/refresh',authController.refresh)
router.post('/logout', authController.logout )

// export the router
module.exports = router;