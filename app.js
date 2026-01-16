const express = require('express');
const bodyParser = require('body-parser');
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


app.use('/api/v1/auditoria_sicov',auditoriaSicovRouter)



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});