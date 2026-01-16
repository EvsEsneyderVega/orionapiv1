const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const auditoriaSicovRouter = require('./routes/auditoriaSicov.routes.js');

const cors = require('cors');

const app = express(); 

app.use(cors({
    origin: ['*'], // orígenes permitidos
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Orion SICOV',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Auditoria: {
          type: 'object',
          properties: {
            ID_REVISION: { type: 'integer' },
            SERIAL_EQUIPO_MEDICION: { type: 'string' },
            IP_EQUIPO_MEDICION: { type: 'string' },
            FECHA_EVENTO: { type: 'string', example: '2025-07-07 21:26:25' },
            TIPO_OPERACION: { type: 'integer' },
            TIPO_EVENTO: { type: 'integer' },
            CODIGO_PROVEEDOR: { type: 'integer' },
            ID_RUNT_CDA: { type: 'integer' },
            TRAMA: { type: 'string' },
            IDENTIFICACION_USUARIO: { type: 'string' },
            OBSERVACION: { type: 'string' },
            USUARIO: { type: 'string' },
            PLACA: { type: 'string' }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, './routes/*.js')],
};

// Intenta generar la documentación, si falla lanza un aviso pero no rompas el servidor
let swaggerDocs;
try {
    swaggerDocs = swaggerJsdoc(swaggerOptions);
} catch (err) {
    console.error("Error cargando documentación Swagger:", err.message);
}

if (swaggerDocs) {
    app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}


app.use('/api/v1/auditoria_sicov',auditoriaSicovRouter)


// 🧠 Función para obtener tu IP local automáticamente
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (let name of Object.keys(interfaces)) {
        for (let net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
}

const PORT = process.env.PORT || 3000;
const IP = getLocalIP();
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${IP}:${PORT}`);
});