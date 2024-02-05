const express = require('express')
const router = express.Router();
const prodController =  require('../controllers/prodController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.use('/uploads', express.static('uploads'))

router.get('/produit', prodController.getAllProduits);
router.post('/produit', upload.single('image'), prodController.postProd);
router.put('/produit/:puid', prodController.putProdbypuid);
router.delete('/produit/:puid',prodController.deleteProd)
router.put('/produit/:puid/decrement', prodController.decrementProd);

module.exports = router;