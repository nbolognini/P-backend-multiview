
const mysql = require('mysql');
let connection;

function handleDisconnect() {
    connection = mysql.createConnection({
        host: '192.168.227.156',
        user: 'root',
        password: 'eclipse',
        database: 'multiview',
        connectTimeout: 10000
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