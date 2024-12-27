const express = require('express');
const router = express.Router();
const fichiersController = require('../controllers/fichiersController');

router.get('/', fichiersController.getAllFichiers);
router.get('/rapport/:rapp_id', fichiersController.getFichierByRappId);
router.get('/:id', fichiersController.getFichierById);
router.post('/', fichiersController.createFichier);
router.put('/:id', fichiersController.updateFichier);
router.delete('/:id', fichiersController.deleteFichier);

module.exports = router;
