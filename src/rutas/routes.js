const express = require ('express');
const router = express.Router();
const salaController = require('../controladores/salaControlador');

router.get('/',salaController.list);
router.post('/add', salaController.save);

module.exports = router;