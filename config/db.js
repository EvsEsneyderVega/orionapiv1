const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_ORION_HOST,
    port:process.env.DB_ORION_PORT,
    user: process.env.DB_ORION_USER,
    password: process.env.DB_ORION_PASSWORD,
    database: process.env.DB_ORION_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos orion');
});

module.exports = db;
