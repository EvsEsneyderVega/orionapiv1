const db = require('../config/db');

class auditoriaSicovModel {
    // Obtener todos los registros
    static getAll() {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM auditoria_sicov ORDER BY FECHA_REGISTRO_BD DESC limit 100";
            db.query(sql, (err, results) => {
                if (err) return reject(new Error('Error al obtener auditorías: ' + err.message));
                resolve(results);
            });
        });
    }

    // Obtener por ID único
    static getById(ID_AUDITORIA_SICOV) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM auditoria_sicov WHERE ID_AUDITORIA_SICOV = ?";
            db.query(sql, [ID_AUDITORIA_SICOV], (err, results) => {
                if (err) return reject(new Error('Error al buscar registro: ' + err.message));
                resolve(results[0]); // Retornamos solo el objeto
            });
        });
    }

    // Insertar nuevo registro con todos tus campos
    static add(data) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO auditoria_sicov 
            (ID_REVISION, SERIAL_EQUIPO_MEDICION, IP_EQUIPO_MEDICION, FECHA_REGISTRO_BD, 
             FECHA_EVENTO, TIPO_OPERACION, TIPO_EVENTO, CODIGO_PROVEEDOR, ID_RUNT_CDA, 
             TRAMA, IDENTIFICACION_USUARIO, OBSERVACION, USUARIO, PLACA) 
            VALUES (?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const params = [
                data.ID_REVISION, data.SERIAL_EQUIPO_MEDICION, data.IP_EQUIPO_MEDICION,
                data.FECHA_EVENTO, data.TIPO_OPERACION, data.TIPO_EVENTO,
                data.CODIGO_PROVEEDOR, data.ID_RUNT_CDA, data.TRAMA,
                data.IDENTIFICACION_USUARIO, data.OBSERVACION, data.USUARIO, data.PLACA
            ];

            db.query(sql, params, (err, results) => {
                if (err) return reject(new Error('Error al insertar en SICOV: ' + err.message));
                resolve(results);
            });
        });
    }
}

module.exports = { auditoriaSicovModel };