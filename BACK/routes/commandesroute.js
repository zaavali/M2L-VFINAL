const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');
const decodeToken = require('../middleware/uuid');

router.post('/valider', decodeToken, commandeController.valider);
router.get('/commandes', commandeController.getAllCommandes);

module.exports = router;