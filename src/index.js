const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
const port = 3000;
const portSSL = 3001;
const routes = require('./api/endPoints');
const cors = require('cors');
const path = require('path'); // Importar path



app.use(cors( { origin: "*",  
                methods: ["GET", "POST"],
} ));

// Configurar express.static para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agregar las rutas de nuestro archivo endPoints.js
app.use('/', routes);

//<<<<<<< HEAD

// *********************Agregado (SACADO PARA DESARROLLO), :*********************
//const options = {
//    key: fs.readFileSync('/etc/nginx/ssl/telecentro.net.ar.key'),
//    cert: fs.readFileSync('/etc/nginx/ssl/telecentro.net.ar.crt')
//};

//https.createServer(options, app).listen(port, () => {
//    console.log(`Server listening on port ${port}`);
//});
// Hasta ACA







 //ESCUCHA POR HTTP:
app.listen(port, () => {    
    console.log(`Example app listening at http://localhost:${port}`);
});
