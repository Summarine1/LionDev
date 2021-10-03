const express = require ('express');
const router = express.Router();
const salaController = require('../controladores/salaControlador');

router.get('/',salaController.listReser);
router.post('/addReser', salaController.saveReser);
router.post('/addSala', salaController.saveSala);

module.exports = router;