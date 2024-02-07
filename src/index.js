const express = require('express');
const app = express();
const port = 3000;
const routes = require('./api/endPoints');
const cors = require('cors');

app.use(cors( { origin: "*",  
                methods: ["GET", "POST"],
} ));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);




// Agregado:
const options = {
    key: fs.readFileSync('etc/nginx/clave.privada.key'),
    cert: fs.readFileSync('etc/nginx/clave.certificado.crt')
};

https.createServer(options, app).listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
// Hasta ACA





app.listen(port, () => {    
    console.log(`Example app listening at http://localhost:${port}`);
});