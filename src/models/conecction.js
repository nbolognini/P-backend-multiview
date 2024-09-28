
const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde .env

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        //paso a INT el string que viene en el .env
        connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT)
    });

    connection.connect(function (error) {
        if (error) {
            console.error('Error conectando a la base de datos:', error);
            setTimeout(handleDisconnect, 2000); // Reintentar después de 2 segundos
        } else {
            console.log('Conectado a la base de datos');
        }
    });

    connection.on('error', function (error) {
        console.error('Error en la conexión a la base de datos:', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconectar automáticamente
        } else {
            throw error;
        }
    });
}

handleDisconnect();

module.exports = connection;