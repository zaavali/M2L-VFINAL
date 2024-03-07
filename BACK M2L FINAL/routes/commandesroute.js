const express = require('express');
const router = express.Router();
const commandeController =  require('../controllers/commandeController');
const middlewareAuth = require('../middleware/middleware');


router.post('/valider', middlewareAuth.authenticator, commandeController.valider);
router.get('/commandes', commandeController.getAllCommandes);


module.exports = router;
