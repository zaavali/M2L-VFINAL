const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticator } = require('../middleware/middleware');

router.post('/ins', userController.postUser);
router.post('/conn', userController.conn);
router.delete('/user/:uuid', userController.deleteUser);
router.post('/logout', userController.handleLogout);

router.get('/user', userController.getAllUser);

module.exports = router;
