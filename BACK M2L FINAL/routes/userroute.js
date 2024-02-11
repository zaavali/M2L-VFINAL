const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middlewareAuth = require('../middleware/middleware');

router.post('/ins', userController.postUser);
router.post('/conn', userController.conn);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:uuid', middlewareAuth.authenticator, userController.deleteUser);
router.post('/logout', userController.handleLogout);
router.get('/user', middlewareAuth.authenticator, userController.getAllUser);

module.exports = router;
