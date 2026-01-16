const express = require('express');

const router = express.Router();

const { getAll,getById,add } = require('../controller/auditoriaSicov.controller.js');

router.get('/all/',getAll);

router.get('/byid/:ID_AUDITORIA_SICOV',getById)

router.post('/add/',add);

module.exports = router;