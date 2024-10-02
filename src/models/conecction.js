const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde .env

let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT, 10)
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

    // Mantener la conexión activa enviando un ping cada 5 minutos
    setInterval(() => {
        connection.ping((err) => {
            if (err) {
                console.error('Error pinging database:', err);
                handleDisconnect(); // Reconectar si el ping falla
            } else {
                console.log('Ping a la base de datos exitoso');
            }
        });
    }, 300000); // 300000 ms = 5 minutos
}

handleDisconnect();

module.exports = connection;