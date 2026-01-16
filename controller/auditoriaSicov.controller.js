const { auditoriaSicovModel } = require('../model/auditoriaSicov.orion.model');

async function getAll(req, res) {
    try {
        const results = await auditoriaSicovModel.getAll();

        
        if (!results || results.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No se encontraron registros de auditoría' 
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results         
        });

    } catch (error) {
        
        console.error('Error en getAll Auditoría:', error);
        
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor', 
            detalle: error.message 
        });
    }
}

async function getById(req,res) {
    try {
        const {ID_AUDITORIA_SICOV} = req.params
        const results = await auditoriaSicovModel.getById(ID_AUDITORIA_SICOV);

        
        if (!results || results.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No se encontraron registros de auditoría' 
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results         
        });

    } catch (error) {
        
        console.error('Error en getAll Auditoría:', error);
        
        res.status(500).json({ 
            success: false,
            error: 'Error interno del servidor', 
            detalle: error.message 
        });
    }
}

async function add(req, res) {
    try {
        const data = req.body;

        // Validación básica: verificar si el objeto data tiene llaves
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No se proporcionaron datos para el registro'
            });
        }

        const result = await auditoriaSicovModel.add(data);

        res.status(201).json({
            success: true,
            message: 'Registro de auditoría creado exitosamente',
            insertId: result.insertId // El ID generado por el AI de MySQL
        });

    } catch (error) {
        console.error('Error en add Auditoría:', error);
        res.status(500).json({
            success: false,
            error: 'Error al insertar el registro',
            detalle: error.message
        });
    }
}

module.exports = { getAll,getById,add };