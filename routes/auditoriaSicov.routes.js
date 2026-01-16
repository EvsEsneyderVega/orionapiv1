const express = require('express');

const router = express.Router();

const { getAll,getById,add } = require('../controller/auditoriaSicov.controller.js');

/**
 * @swagger
 * /api/v1/auditoria_sicov/all:
 * get:
 * summary: Listar auditorías
 * responses:
 * 200:
 * description: Lista de registros
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Auditoria'
 */
router.get('/all/', getAll);

/**
 * @swagger
 * /api/v1/auditoria_sicov/add:
 * post:
 * summary: Crear registro de auditoría
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Auditoria'
 * responses:
 * 201:
 * description: Creado exitosamente
 */
router.post('/add/', add);

router.get('/byid/:ID_AUDITORIA_SICOV',getById)


module.exports = router;