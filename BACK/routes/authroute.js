const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticator } = require('../middleware/middleware');

router.get('/conn', authenticator,authController.getUser);


module.exports = router;